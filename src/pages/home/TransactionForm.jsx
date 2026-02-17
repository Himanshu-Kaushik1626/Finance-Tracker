import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid }) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('expense')
    const [category, setCategory] = useState('')
    const { addDocument, response } = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            name,
            amount,
            date,
            type,
            category: category || 'General',
            createdAt: new Date().toISOString()
        })
    }

    useEffect(() => {
        if (response.success) {
            setName('')
            setAmount('')
            setDate('')
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
                    <span>Date:</span>
                    <input
                        type="date"
                        required
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
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
                    <input
                        type="text"
                        placeholder="e.g. Food, Rent, Salary"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                </label>

                <button className="btn">Add Transaction</button>
            </form>
        </>
    )
}
