const xlsx = require("xlsx")
const Income = require("../models/Income.js")

// add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;
        // validation check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json({ message: "Added succesfully" })
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "income deleted" + req.params.id });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}


exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0]  // Format as YYYY-MM-DD
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename=income_details.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
