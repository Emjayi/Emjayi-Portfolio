'use client';
import { useState } from 'react';

interface Expense {
  description: string;
  amount: number;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const addExpense = () => {
    if (description && amount) {
      setExpenses([...expenses, { description, amount: parseFloat(amount) }]);
      setDescription('');
      setAmount('');
    }
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  return (
    <div>
      <h1>Expense Tracker</h1>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addExpense}>Add Expense</button>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.description}: ${expense.amount.toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
    </div>
  );
};

export default ExpenseTracker;
