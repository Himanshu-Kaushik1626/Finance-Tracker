import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0', '#00E396', '#FEB019', '#FF4560'];

export default function ExpenseChart({ transactions }) {
    // Filter only expenses
    const expenses = transactions.filter(t => t.type === 'expense');

    // Group by category
    const data = expenses.reduce((acc, curr) => {
        const category = curr.category || 'Other';
        const existing = acc.find(item => item.name === category);
        if (existing) {
            existing.value += Number(curr.amount);
        } else {
            acc.push({ name: category, value: Number(curr.amount) });
        }
        return acc;
    }, []);

    if (data.length === 0) return <p>No expenses to show</p>;

    return (
        <div style={{ height: "300px", width: "100%", marginTop: "40px" }}>
            <h3>Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
