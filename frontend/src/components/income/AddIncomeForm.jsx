import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
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
        value={income.source}
        onChange={({ target }) => handleChnange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChnange("amount", target.value)}
        label="Amount"
        placeholder="₹2000"
        type="text"
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
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
