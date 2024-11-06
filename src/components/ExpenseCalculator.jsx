import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./expense.module.css"; 

const ExpenseCalculator = () => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const addExpense = async () => {
    setError("");
    if (!itemName || !quantity || !price) {
      setError("Item name, quantity, and price are required.");
      return;
    }

    try {
      await axios.post("https://calculator-back-8ljb.vercel.app/api/expenses/add", {
        itemName,
        quantity,
        price,
      });

      fetchExpenses();
      setItemName("");
      setQuantity("");
      setPrice("");
    } catch (error) {
      setError(error.response?.data.error || "Error adding expense");
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("https://calculator-back-8ljb.vercel.app/api/expenses");
      setExpenses(response.data.expenses);
      setTotal(response.data.total);
    } catch (error) {
      setError(error.response?.data.error || "Error fetching expenses");
    }
  };

  const removeExpense = async (id) => {
    try {
      await axios.delete(`https://calculator-back-8ljb.vercel.app/api/expenses/${id}`);
      fetchExpenses(); // Fetch updated list after deletion
    } catch (error) {
      setError(error.response?.data.error || "Error deleting expense");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inputSection}>
        <h2>Expense Calculator</h2>
        <p>This calculator shows you the Total Amount of Expense.</p>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price per Item (PKR)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className={styles.addButton} onClick={addExpense}>
          Add Item
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>

      <div className={styles.expenseList}>
        <h4>Expense List:</h4>
        {expenses.map((expense) => (
          <div key={expense.id} className={styles.expenseItem}style={{border : '1px solid black'}} >
            <span>
              {expense.itemName}-{expense.quantity} x PKR {expense.price} = PKR{" "}
              {expense.total}
            </span>
            <button
              onClick={() => removeExpense(expense.id)}
              className={styles.removeButton}
            >
              ❌
            </button>
          </div>
        ))}
        <h3>Total Expenses: PKR {total}</h3>
      </div>
    </div>
  );
};

export default ExpenseCalculator;