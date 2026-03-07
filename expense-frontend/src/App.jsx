import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://127.0.0.1:8000/api/expenses/";

function App() {

  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const fetchExpenses = async () => {
    const res = await axios.get(API);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (e) => {
    e.preventDefault();

    await axios.post(API, {
      title: title,
      amount: amount,
      category: category,
      user: 1
    });

    setTitle("");
    setAmount("");

    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API}${id}/`);
    fetchExpenses();
  };

  const total = expenses.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0
  );

  return (
    <div className="container">

      <h1>Smart Expense Tracker</h1>

      <form onSubmit={addExpense}>

        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>

        <button type="submit">Add Expense</button>

      </form>

      <h2>Total: ₹{total}</h2>

      <ul>

        {expenses.map((exp) => (
          <li key={exp.id}>

            {exp.title} - ₹{exp.amount} ({exp.category})

            <button onClick={() => deleteExpense(exp.id)}>
              Delete
            </button>

          </li>
        ))}

      </ul>

    </div>
  );
}

export default App;