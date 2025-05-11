const xlsx = require("xlsx")
const Expense = require("../models/Expense.js")

// add Expense source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;
        // validation check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json({ message: "Added succesfully" })
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted" + req.params.id });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}


exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const Expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = Expense.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0]  // Format as YYYY-MM-DD
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename=Expense_details.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
