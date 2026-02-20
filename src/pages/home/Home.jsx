import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import MoneyFlow from './MoneyFlow'
import ExpenseChart from './ExpenseChart'
import BarChartComponent from './BarChartComponent'
import FloatingDownloadBtn from './FloatingDownloadBtn'
import TransactionFilter from './TransactionFilter'

// styles
import styles from './Home.module.css'

import Modal from '../../components/Modal'
import FloatingAddBtn from './FloatingAddBtn'

export default function Home() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection(
        'transactions',
        ["uid", "==", user.uid],
        ["createdAt", "desc"]
    )
    const [currentFilter, setCurrentFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [sortOption, setSortOption] = useState('newest')
    const [editingTransaction, setEditingTransaction] = useState(null)

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const transactions = documents ? documents.filter((document) => {
        // Search Filter
        const nameMatch = document.name ? document.name.toLowerCase().includes(searchQuery.toLowerCase()) : false
        const categoryMatch = document.category ? document.category.toLowerCase().includes(searchQuery.toLowerCase()) : false

        if (!nameMatch && !categoryMatch) return false

        // Type Filter
        if (typeFilter !== 'all' && document.type !== typeFilter) return false

        // Category Filter
        if (categoryFilter !== 'all' && document.category !== categoryFilter) return false

        switch (currentFilter) {
            case 'all':
                return true
            case 'today':
                const today = new Date().toISOString().split('T')[0]
                return document.date === today
            case 'last 7 days':
                const sevenDaysAgo = new Date()
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
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
    }).sort((a, b) => {
        switch (sortOption) {
            case 'newest':
                return new Date(b.date) - new Date(a.date)
            case 'oldest':
                return new Date(a.date) - new Date(b.date)
            case 'highest':
                return b.amount - a.amount
            case 'lowest':
                return a.amount - b.amount
            default:
                return 0
        }
    }) : null

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingTransaction(null)
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {error && <p>{error}</p>}

                {documents && <TransactionFilter currentFilter={currentFilter} changeFilter={changeFilter} />}

                {transactions && <FloatingDownloadBtn transactions={transactions} />}

                <FloatingAddBtn onClick={() => setShowModal(true)} />

                {transactions && <MoneyFlow transactions={transactions} />}
                {transactions && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <ExpenseChart transactions={transactions} />
                        <BarChartComponent transactions={transactions} />
                    </div>
                )}
                {/* Transactions Section */}
                {transactions && (
                    <motion.div
                        className={styles.transactionsSection}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <div className={styles.transactionsHeader}>
                            <h3>Transaction History</h3>
                            <div className={styles.filterControls}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={styles.searchInput}
                                />
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className={styles.filterSelect}
                                >
                                    <option value="all">All Types</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className={styles.filterSelect}
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Food">Food</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Others">Others</option>
                                </select>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className={styles.filterSelect}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="highest">Highest Amount</option>
                                    <option value="lowest">Lowest Amount</option>
                                </select>
                            </div>
                        </div>
                        <TransactionList transactions={transactions} onEdit={handleEdit} />
                    </motion.div>
                )}
            </div>

            {showModal && (
                <Modal handleClose={handleCloseModal}>
                    <TransactionForm
                        uid={user.uid}
                        initialData={editingTransaction}
                        onSuccess={handleCloseModal}
                    />
                </Modal>
            )}
        </div>
    )
}
