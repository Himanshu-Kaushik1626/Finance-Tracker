import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import MoneyFlow from './MoneyFlow'
import ExpenseChart from './ExpenseChart'
import TransactionFilter from './TransactionFilter'

// styles
import styles from './Home.module.css'

export default function Home() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection(
        'transactions',
        ["uid", "==", user.uid],
        ["createdAt", "desc"]
    )
    const [currentFilter, setCurrentFilter] = useState('all')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const transactions = documents ? documents.filter((document) => {
        switch (currentFilter) {
            case 'all':
                return true
            case 'today':
                const today = new Date().toISOString().split('T')[0]
                return document.date === today
            case 'last 7 days':
                const sevenDaysAgo = new Date()
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
                // Check if date string exists
                if (!document.date) return false
                return new Date(document.date) >= sevenDaysAgo
            case 'this month':
                const currentMonth = new Date().getMonth()
                const currentYear = new Date().getFullYear()
                if (!document.date) return false
                const docDate = new Date(document.date)
                return docDate.getMonth() === currentMonth && docDate.getFullYear() === currentYear
            default:
                return true
        }
    }) : null

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {error && <p>{error}</p>}

                {documents && <TransactionFilter currentFilter={currentFilter} changeFilter={changeFilter} />}

                {transactions && <MoneyFlow transactions={transactions} />}
                {transactions && <ExpenseChart transactions={transactions} />}
                {transactions && <TransactionList transactions={transactions} />}
            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    )
}
