import styles from './TransactionFilter.module.css'

const filterList = ['all', 'today', 'last 7 days', 'this month']

export default function TransactionFilter({ currentFilter, changeFilter }) {
    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }

    return (
        <div className={styles.filter_nav}>
            {filterList.map((f) => (
                <button
                    key={f}
                    onClick={() => handleClick(f)}
                    className={currentFilter === f ? styles.active : ''}
                >
                    {f}
                </button>
            ))}
        </div>
    )
}
