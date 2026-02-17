import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'

// components
import TransactionList from '../components/TransactionList'
import TransactionForm from '../components/TransactionForm'
import SummaryCards from '../components/SummaryCards'
import ExpenseChart from '../components/Charts/ExpenseChart'

export default function Dashboard() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection(
        'transactions',
        ["uid", "==", user.uid],
        ["createdAt", "desc"]
    )
    const [filter, setFilter] = useState('all')

    const transactions = documents ? documents.filter(document => {
        switch (filter) {
            case 'all':
                return true
            case 'income':
                return document.type === 'income'
            case 'expense':
                return document.type === 'expense'
            default:
                return true
        }
    }) : null

    return (
        <div className="dashboard">
            <div className="content">
                {error && <p>{error}</p>}
                {documents && <SummaryCards />}

                {documents && <ExpenseChart transactions={documents} />}

                <div className="filter-container" style={{ margin: "20px 0" }}>
                    <span style={{ marginRight: "10px", fontWeight: "bold" }}>Filter by:</span>
                    <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>All</button>
                    <button onClick={() => setFilter('income')} className={`filter-btn ${filter === 'income' ? 'active' : ''}`}>Income</button>
                    <button onClick={() => setFilter('expense')} className={`filter-btn ${filter === 'expense' ? 'active' : ''}`}>Expenses</button>
                </div>

                {transactions && <TransactionList transactions={transactions} />}
            </div>
            <div className="sidebar">
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    )
}
