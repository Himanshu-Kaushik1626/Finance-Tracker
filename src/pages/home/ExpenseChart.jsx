import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styles from './Home.module.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3'];

export default function ExpenseChart({ transactions }) {
    // Filter only expenses
    const expenses = transactions.filter(t => t.type === 'expense')

    // Group by category and sum amounts
    const data = expenses.reduce((acc, curr) => {
        const existingCategory = acc.find(item => item.name === curr.category)
        if (existingCategory) {
            existingCategory.value += Number(curr.amount)
        } else {
            acc.push({ name: curr.category, value: Number(curr.amount) })
        }
        return acc
    }, [])

    if (data.length === 0) {
        return <div className={styles.chartContainer}><p>No expenses to show</p></div>
    }

    return (
        <div className={styles.chartContainer}>
            <h3>Expense Breakdown</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
        </div>
    )
}
