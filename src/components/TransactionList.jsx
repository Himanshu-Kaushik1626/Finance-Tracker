import { useFirestore } from '../hooks/useFirestore'

// styles placeholder
// import styles from './Home.module.css'

export default function TransactionList({ transactions }) {
    const { deleteDocument } = useFirestore('transactions')

    return (
        <ul className="transactions">
            {transactions.map((transaction) => (
                <li key={transaction.id} style={{
                    borderLeft: `4px solid ${transaction.type === 'income' ? '#1f9751' : '#e63946'}`,
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.05)",
                    padding: "20px",
                    margin: "20px 0",
                    borderRadius: "4px",
                    position: "relative",
                    background: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div>
                        <p className="name" style={{ fontSize: "1.2em", color: "#444", fontWeight: "bold" }}>{transaction.name}</p>
                        <p className="amount" style={{ fontSize: "1.2em", color: "#333" }}>${transaction.amount}</p>
                    </div>
                    <button onClick={() => deleteDocument(transaction.id)} style={{
                        background: "#eee",
                        border: "none",
                        padding: "6px 12px",
                        cursor: "pointer",
                        float: "right"
                    }}>x</button>
                </li>
            ))}
        </ul>
    )
}
