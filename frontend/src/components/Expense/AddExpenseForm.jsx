import React, { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../Inputs/Input";
const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });
  const handleChnange = (key, value) => setIncome({ ...income, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChnange("icon", selectedIcon)}
      />
      <Input
        value={income.category}
        onChange={({ target }) => handleChnange("category", target.value)}
        label="Category"
        placeholder="Food, Rent, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChnange("amount", target.value)}
        label="Amount"
        placeholder="₹2000"
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChnange("date", target.value)}
        label="Date"
        placeholder="2002-01-11"
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(income)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
