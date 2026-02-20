import { useCollection } from "../hooks/useCollection"
import { useAuthContext } from "../hooks/useAuthContext"
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa'

export default function SummaryCards() {
    const { user } = useAuthContext();
    const { documents, error } = useCollection(
        'transactions',
        ["uid", "==", user.uid]
    );

    const amounts = documents ? documents.map(doc => ({ amount: Number(doc.amount), type: doc.type })) : [];

    const totalIncome = amounts
        .filter(item => item.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpense = amounts
        .filter(item => item.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpense;

    return (
        <div className="summary">
            <div className="card">
                <FaWallet className="card-icon" />
                <h3>Balance</h3>
                <p className="amount">${balance}</p>
            </div>
            <div className="card income">
                <FaArrowUp className="card-icon" />
                <h3>Income</h3>
                <p className="amount">+${totalIncome}</p>
            </div>
            <div className="card expense">
                <FaArrowDown className="card-icon" />
                <h3>Expenses</h3>
                <p className="amount">-${totalExpense}</p>
            </div>
        </div>
    );
}
