import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionList({ transactions }) {
    const { deleteDocument } = useFirestore('transactions')

    return (
        <ul className="transactions">
            {transactions.map((transaction) => (
                <li
                    key={transaction.id}
                    style={{
                        borderLeft: `6px solid ${transaction.type === 'income' ? '#1f9751' : '#e63946'}`
                    }}
                >
                    <div>
                        <p className="name">{transaction.name}</p>
                        <p style={{ color: '#777', fontSize: '0.9em', margin: 0 }}>
                            {transaction.category || 'Uncategorized'} • {transaction.date || 'No Date'}
                        </p>
                    </div>
                    <p className="amount" style={{ marginLeft: 'auto', marginRight: '20px' }}>${transaction.amount}</p>
                    <button onClick={() => deleteDocument(transaction.id)}>x</button>
                </li>
            ))}
        </ul>
    )
}
