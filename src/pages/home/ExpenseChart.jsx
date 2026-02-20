import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import styles from './Home.module.css'

// Muted Dark Theme Palette
const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6'];

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

    const totalExpense = data.reduce((acc, curr) => acc + curr.value, 0)

    if (data.length === 0) {
        return <div className={styles.chartContainer}><p style={{ color: 'var(--text-secondary)' }}>No expenses to show</p></div>
    }

    return (
        <div className={styles.chartContainer}>
            <h3>Expense Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', height: 400, position: 'relative' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)'
                                }}
                                itemStyle={{ color: 'var(--text-primary)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Centered Total */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total</span>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>₹{totalExpense}</div>
                    </div>
                </div>

                {/* Custom Legend */}
                <ul style={{ width: '100%', padding: 0, marginTop: '20px' }}>
                    {data.map((entry, index) => (
                        <li key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                            borderBottom: '1px solid var(--card-border)',
                            paddingBottom: '5px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[index % COLORS.length] }}></div>
                                <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{entry.name}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>₹{entry.value}</span>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{((entry.value / totalExpense) * 100).toFixed(0)}%</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
