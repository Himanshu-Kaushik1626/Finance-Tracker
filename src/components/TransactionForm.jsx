import { useState, useEffect } from 'react'
import { useFirestore } from '../hooks/useFirestore'

const categories = [
    "Salary", "Freelance", "Food", "Rent", "Utilities", "Transport", "Entertainment", "Shopping", "Health", "Education", "Other"
]

export default function TransactionForm({ uid }) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('expense') // 'income' or 'expense'
    const [category, setCategory] = useState('')
    const { addDocument, response } = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            name,
            amount,
            type,
            category: category || "Other"
        })
    }

    // reset the form fields
    useEffect(() => {
        if (response.success) {
            setName('')
            setAmount('')
            setType('expense')
            setCategory('')
        }
    }, [response.success])

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                <label>
                    <span>Type:</span>
                    <select onChange={(e) => setType(e.target.value)} value={type}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </label>
                <label>
                    <span>Category:</span>
                    <select onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="">Select a category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </label>
                <button className="btn">Add Transaction</button>
            </form>
        </>
    )
}
