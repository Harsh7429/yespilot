import { startOfWeek, subWeeks, isSameMonth, subMonths, isSameDay, subDays } from 'date-fns';

export const generateInsightsEngine = (expenses, budget) => {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();
  const daysRemaining = daysInMonth - currentDay;
  
  // 1. Basic Monthly Aggregation
  const currentMonthExpenses = expenses.filter(e => isSameMonth(new Date(e.date), now));
  const totalMonthly = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = budget - totalMonthly;
  const progress = budget > 0 ? Math.min((totalMonthly / budget) * 100, 100) : 0;

  // 2. Weekly Trend Analysis
  const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
  const startOfLastWeek = subWeeks(startOfCurrentWeek, 1);
  
  const thisWeekExpenses = expenses.filter(e => new Date(e.date) >= startOfCurrentWeek);
  const lastWeekExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d >= startOfLastWeek && d < startOfCurrentWeek;
  });

  const thisWeekTotal = thisWeekExpenses.reduce((sum, e) => sum + e.amount, 0);
  const lastWeekTotal = lastWeekExpenses.reduce((sum, e) => sum + e.amount, 0);
  const weeklyChange = lastWeekTotal ? ((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100 : 0;

  // 3. Category Growth Detection
  const lastMonthExpenses = expenses.filter(e => isSameMonth(new Date(e.date), subMonths(now, 1)));
  const currentMonthCategoryStats = currentMonthExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const lastMonthCategoryStats = lastMonthExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  let highestGrowthCategory = null;
  let highestGrowthDiff = 0;
  for (const cat in currentMonthCategoryStats) {
    const current = currentMonthCategoryStats[cat];
    const past = lastMonthCategoryStats[cat] || 0;
    const diff = current - past;
    if (diff > 20 && diff > highestGrowthDiff) {
      highestGrowthDiff = diff;
      highestGrowthCategory = cat;
    }
  }

  const topCategoryStr = Object.entries(currentMonthCategoryStats).sort((a,b) => b[1] - a[1])[0] || ['None', 0];

  // 4. THE HOOK: Financial Score Logic
  let score = 100;
  if (budget > 0) {
    // Expected spend per day vs actual spend
    const dailyBudget = budget / daysInMonth;
    const expectedSpendSoFar = dailyBudget * currentDay;
    if (totalMonthly > expectedSpendSoFar) {
      const overagePercent = (totalMonthly - expectedSpendSoFar) / expectedSpendSoFar;
      score -= (overagePercent * 50); 
    } else {
      score += 5; // Bonus for being under expectation
    }
  }
  if (weeklyChange > 0) score -= (weeklyChange / 2); // Penalize rising weekly costs
  if (score > 100) score = 100;
  if (score < 30) score = 30; // Floor

  // 5. THE HOOK: Discipline Streak (Consecutive days under daily budget or $0)
  let streak = 0;
  const safeDailyLimit = budget > 0 ? (budget / daysInMonth) : 50;
  for (let i = 0; i < 30; i++) {
    const checkDate = subDays(now, i);
    const dayExpenses = expenses.filter(e => isSameDay(new Date(e.date), checkDate));
    const dayTotal = dayExpenses.reduce((sum, e) => sum + e.amount, 0);
    if (dayTotal < safeDailyLimit) {
      streak++;
    } else {
      break; 
    }
  }

  // 6. WOW Moment Generation (Emotional Hero Metric)
  let wowMessage = { title: "", sub: "", emotion: "neutral" };
  const lastMonthTotal = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const momChange = lastMonthTotal ? ((totalMonthly - lastMonthTotal) / lastMonthTotal) * 100 : 0;

  if (momChange < -5) {
    wowMessage = { title: `You're ${Math.abs(momChange).toFixed(1)}% better than last month 🚀`, sub: `You've genuinely saved $${Math.abs(totalMonthly - lastMonthTotal).toFixed(0)} more. Absolute dominance.`, emotion: "success" };
  } else if (streak > 3) {
    wowMessage = { title: `${streak} days of perfect discipline 🔥`, sub: "You are spending under your daily limits. Keep the streak alive!", emotion: "success" };
  } else if (progress < 50 && currentDay > 15) {
    wowMessage = { title: `On track to save $${balance.toFixed(0)} 🎉`, sub: "More than half the month is done. You are crushing your budget.", emotion: "success" };
  } else if (progress > 90) {
    wowMessage = { title: `Budget Critical ⚠️`, sub: "Halt non-essential spending immediately to survive the month.", emotion: "danger" };
  } else {
    wowMessage = { title: `Welcome back, Commander ✈️`, sub: "All systems online. Your telemetry is ready.", emotion: "neutral" };
  }

  // 7. Action-Driven AI Messages
  const messages = [];

  // Aggressive Actionable Math
  if (highestGrowthCategory && highestGrowthDiff > 20) {
    const dailyReduction = 5; // Arbitrary micro-savings target
    const monthlySavings = dailyReduction * 30;
    messages.push({ type: 'warning', text: `If you reduce $${dailyReduction}/day from ${highestGrowthCategory}, you can instantly save $${monthlySavings} this month. Stop the leak.` });
  }

  if (weeklyChange > 15 && thisWeekTotal > 50) {
    messages.push({ type: 'warning', text: `Your spending increased ${weeklyChange.toFixed(0)}% this week. Dial it back by $${(thisWeekTotal * 0.2).toFixed(0)} over the next 3 days to stabilize.` });
  }

  if (budget > 0 && progress > 80) {
    const safeDaily = balance / (daysRemaining || 1);
    messages.push({ type: 'danger', text: `You are ${progress.toFixed(0)}% through your budget! Limit expenses to strictly $${safeDaily.toFixed(0)}/day for the rest of the month.` });
  }

  if (messages.length === 0) {
    messages.push({ type: 'success', text: "Your financial velocity is perfect. Keep your daily spend under control." });
  }

  return {
    totalMonthly,
    balance,
    progress,
    momChange,
    topCategory: topCategoryStr[0],
    currentMonthExpenses,
    insights: messages,
    score: Math.round(score),
    streak,
    wowMessage
  };
};
