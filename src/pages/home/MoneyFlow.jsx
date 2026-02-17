import styles from './Home.module.css'

export default function MoneyFlow({ transactions }) {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0)
    const total = income - expense

    return (
        <div className={styles.moneyFlow}>
            <div className={styles.card}>
                <h3>Total Balance</h3>
                <p className={styles.total} style={{ color: total >= 0 ? '#1f9751' : '#e63946' }}>${total}</p>
            </div>
            <div className={styles.card}>
                <h3>Income</h3>
                <p className={styles.income}>+${income}</p>
            </div>
            <div className={styles.card}>
                <h3>Expense</h3>
                <p className={styles.expense}>-${expense}</p>
            </div>
        </div>
    )
}
