import moment from "moment";
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}
export const getIntials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase()
}
export const addThousandsSepartor = (num) => {
    if (num == null || isNaN(num)) return "";
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+ (?!\d))/g, ",");

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger
};
export const prepareExpenseBarChartData = (data = []) => {
    const groupedData = {};

    data.forEach((item) => {
        const month = moment(item.date).format("MMM"); // e.g., "May"
        groupedData[month] = (groupedData[month] || 0) + item.amount;
    });

    return Object.entries(groupedData).map(([month, amount]) => ({
        month,
        amount,
    }));
};

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source
    }))

    return chartData
}

export const prepareExpenseLineCharData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        cateogry: item?.cateogry
    }))

    return chartData
}