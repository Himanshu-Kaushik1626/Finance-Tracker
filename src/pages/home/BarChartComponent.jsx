import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styles from './Home.module.css'

export default function BarChartComponent({ transactions }) {
    // Process data: Group by date (last 7 days?) or just Income vs Expense totals
    // Let's do Income vs Expense for simplicity and clarity first

    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0)

    const data = [
        { name: 'Income', amount: income },
        { name: 'Expense', amount: expense }
    ]

    return (
        <div className={styles.chartContainer}>
            <h3>Financial Overview</h3>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" tick={{ fill: 'var(--text-primary)' }} />
                        <YAxis tick={{ fill: 'var(--text-primary)' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--card-bg)',
                                borderRadius: '12px',
                                border: '1px solid var(--card-border)',
                                backdropFilter: 'blur(10px)'
                            }}
                            itemStyle={{ color: 'var(--text-color)' }}
                        />
                        <Legend />
                        <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                            {
                                data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.name === 'Income' ? 'var(--income-color)' : 'var(--expense-color)'} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
