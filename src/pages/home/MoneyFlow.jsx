import styles from './Home.module.css'

export default function MoneyFlow({ transactions }) {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0)
    const total = income - expense

    // Calculate spent percentage
    const spentPercentage = income > 0 ? ((expense / income) * 100).toFixed(0) : 0
    let progressColor = '#10b981' // Green
    if (spentPercentage > 50) progressColor = '#f59e0b' // Yellow
    if (spentPercentage > 80) progressColor = '#ef4444' // Red

    return (
        <div className={styles.moneyFlow}>
            <div className={`${styles.card} ${styles.overviewCard}`} style={{ flex: 1.5 }}>
                <h3>Overview</h3>
                <span className="spent-text">You've spent {spentPercentage}% of your income</span>
                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${Math.min(spentPercentage, 100)}%`, backgroundColor: progressColor }}
                    ></div>
                </div>
                <p className={styles.total}>₹{total}</p>
            </div>
            <div className={`${styles.card} ${styles.incomeCard}`}>
                <h3>Income</h3>
                <p className={styles.income}>+₹{income}</p>
            </div>
            <div className={`${styles.card} ${styles.expenseCard}`}>
                <h3>Expense</h3>
                <p className={styles.expense}>-₹{expense}</p>
            </div>
        </div>
    )
}
