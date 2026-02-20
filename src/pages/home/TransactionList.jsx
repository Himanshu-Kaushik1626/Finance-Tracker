import React from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Home.module.css'
import { IoMdTrash } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'

const categoryIcons = {
    Food: '🍔',
    Rent: '🏠',
    Travel: '✈️',
    Entertainment: '🎬',
    Friends: '👥',
    Others: '📦',
    Salary: '💰',
    Freelance: '💻',
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
    exit: {
        opacity: 0,
        x: -50,
        scale: 0.95,
        transition: { duration: 0.25 },
    },
}

export default function TransactionList({ transactions, onEdit }) {
    const { deleteDocument } = useFirestore('transactions')
    const [openGroups, setOpenGroups] = React.useState({})

    // Group transactions by date (YYYY-MM-DD)
    const groups = transactions.reduce((acc, tx) => {
        const date = tx.date || 'No Date'
        if (!acc[date]) acc[date] = []
        acc[date].push(tx)
        return acc
    }, {})

    const sortedDates = Object.keys(groups).sort((a, b) => {
        if (a === 'No Date') return 1
        if (b === 'No Date') return -1
        return new Date(b) - new Date(a)
    })

    const toggleGroup = (date) => {
        setOpenGroups(prev => ({ ...prev, [date]: !prev[date] }))
    }

    return (
        <div className={styles.transactions}>
            {sortedDates.map((date) => {
                const items = groups[date]
                const totalForDate = items.reduce((s, it) => s + Number(it.amount), 0)
                const isOpen = openGroups[date] !== false

                return (
                    <section key={date} className={styles.transactionGroup}>
                        <div className={styles.transactionGroupHeader} onClick={() => toggleGroup(date)}>
                            <div>
                                <strong>{date === 'No Date' ? 'No Date' : new Date(date).toLocaleDateString()}</strong>
                                <div className={styles.groupSummary}>{items.length} items</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ color: 'var(--text-secondary)' }}>₹{totalForDate}</div>
                                <button className={styles.groupToggleBtn} aria-expanded={isOpen}>
                                    {isOpen ? 'Collapse' : 'Expand'}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.ul
                                    className={styles.transactionGroupList}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {items.map((transaction) => (
                                        <motion.li
                                            key={transaction.id}
                                            className={styles.transactionItem}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="show"
                                            exit="exit"
                                            layout
                                            whileHover={{ scale: 1.015 }}
                                        >
                                            <div className={`${styles.categoryIcon} ${transaction.type === 'income' ? styles.iconIncome : styles.iconExpense}`}>
                                                {categoryIcons[transaction.category] || '📋'}
                                            </div>

                                            <div className={styles.transactionInfo}>
                                                <p className={styles.transactionName}>{transaction.name}</p>
                                                <div className={styles.transactionMeta}>
                                                    <span className={`${styles.typeBadge} ${transaction.type === 'income' ? styles.badgeIncome : styles.badgeExpense}`}>
                                                        {transaction.type === 'income' ? '↑ Income' : '↓ Expense'}
                                                    </span>
                                                    <span className={styles.metaDot}>•</span>
                                                    <span>{transaction.category || 'Uncategorized'}</span>
                                                    <span className={styles.metaDot}>•</span>
                                                    <span className="metaDate">{transaction.date || 'No Date'}</span>
                                                </div>
                                            </div>

                                            <p className={`${styles.transactionAmount} ${transaction.type === 'income' ? styles.amountIncome : styles.amountExpense}`}>
                                                {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                                            </p>

                                            <div className={styles.transactionActions}>
                                                <button
                                                    className={styles.editBtn}
                                                    onClick={() => onEdit(transaction)}
                                                    aria-label="Edit transaction"
                                                >
                                                    <MdEdit size={15} />
                                                </button>
                                                <button
                                                    className={styles.deleteBtn}
                                                    onClick={() => deleteDocument(transaction.id)}
                                                    aria-label="Delete transaction"
                                                >
                                                    <IoMdTrash size={15} />
                                                </button>
                                            </div>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </section>
                )
            })}
        </div>
    )
}
