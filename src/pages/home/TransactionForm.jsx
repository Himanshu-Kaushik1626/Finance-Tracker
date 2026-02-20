import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid, onSuccess, initialData }) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('expense')
    const [category, setCategory] = useState('Food')
    const { addDocument, updateDocument, response } = useFirestore('transactions')

    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
            setAmount(initialData.amount)
            setDate(initialData.date)
            setType(initialData.type)
            setCategory(initialData.category)
        }
    }, [initialData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (initialData) {
            await updateDocument(initialData.id, {
                name,
                amount,
                date,
                type,
                category: category || 'General'
            })
        } else {
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
    }

    useEffect(() => {
        if (response.success) {
            setName('')
            setAmount('')
            setDate('')
            setCategory('Food')
            if (onSuccess) onSuccess()
        }
    }, [response.success, onSuccess])

    return (
        <>
            <h3>{initialData ? 'Edit Transaction' : 'Add a Transaction'}</h3>
            <form onSubmit={handleSubmit}>
                {/* Type Selection Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        type="button"
                        onClick={() => setType('expense')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '8px',
                            border: 'none',
                            background: type === 'expense' ? '#ef4444' : 'rgba(255,255,255,0.1)',
                            color: 'black',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontWeight: '600'
                        }}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('income')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '8px',
                            border: 'none',
                            background: type === 'income' ? '#10b981' : 'rgba(255,255,255,0.1)',
                            color: 'black',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontWeight: '600'
                        }}
                    >
                        Income
                    </button>
                </div>

                <label>
                    <span>Transaction name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>

                {/* Amount and Date Side-by-Side */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    <label style={{ flex: 1 }}>
                        <span>Amount (₹):</span>
                        <input
                            type="number"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                        />
                    </label>
                    <label style={{ flex: 1 }}>
                        <span>Date:</span>
                        <input
                            type="date"
                            required
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        />
                    </label>
                </div>
                <label>
                    <span>Category:</span>
                    <select
                        onChange={(e) => {
                            const val = e.target.value
                            if (val === 'Others') {
                                setCategory('')
                            } else {
                                setCategory(val)
                            }
                        }}
                        value={['Food', 'Rent', 'Travel', 'Entertainment', 'Friends'].includes(category) ? category : 'Others'}
                    >
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Friends">Friends</option>
                        <option value="Others">Others</option>
                    </select>
                </label>

                {(!['Food', 'Rent', 'Travel', 'Entertainment', 'Friends'].includes(category) || category === '') && (
                    <label>
                        <span>Specify Category:</span>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Groceries, Bills"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                    </label>
                )}



                <button
                    className="btn"
                    style={{
                        width: '100%',
                        marginTop: '30px',
                        padding: '14px',
                        fontSize: '1.2rem',
                        background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(5, 150, 105, 0.4)',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.6)'
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.4)'
                    }}
                >
                    {initialData ? 'Update Transaction' : 'Add Transaction'}
                </button>
            </form>
        </>
    )
}
