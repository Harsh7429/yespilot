// Mock database service using localStorage
// In production, use Firestore

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const expenseService = {
  async getExpenses(userId) {
    await delay(500);
    const expenses = JSON.parse(localStorage.getItem(`yp_expenses_${userId}`) || '[]');
    // Sort by date descending
    return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  async addExpense(userId, expense) {
    await delay(600);
    const expenses = JSON.parse(localStorage.getItem(`yp_expenses_${userId}`) || '[]');
    const newExpense = {
      ...expense,
      id: 'e_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    expenses.push(newExpense);
    localStorage.setItem(`yp_expenses_${userId}`, JSON.stringify(expenses));
    return newExpense;
  },

  async deleteExpense(userId, expenseId) {
    await delay(400);
    const expenses = JSON.parse(localStorage.getItem(`yp_expenses_${userId}`) || '[]');
    const filtered = expenses.filter(e => e.id !== expenseId);
    localStorage.setItem(`yp_expenses_${userId}`, JSON.stringify(filtered));
  },

  async getBudget(userId) {
    await delay(400);
    const budget = localStorage.getItem(`yp_budget_${userId}`);
    return budget ? parseInt(budget, 10) : 5000; // Default $5000
  },

  async setBudget(userId, amount) {
    await delay(400);
    localStorage.setItem(`yp_budget_${userId}`, amount.toString());
    return amount;
  }
};
