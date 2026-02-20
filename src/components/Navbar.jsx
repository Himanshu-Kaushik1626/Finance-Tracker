import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '../hooks/useTheme'
import { IoMdMoon, IoMdSunny, IoMdLogOut } from 'react-icons/io'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'

// styles
import styles from './Navbar.module.css'

export default function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const { mode, changeMode } = useTheme()

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                        <RiMoneyDollarCircleLine size={28} />
                        <span>FinBook</span>
                    </Link>
                </li>

                {!user && (
                    <div className={styles.links}>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </div>
                )}

                {user && (
                    <div className={styles.userStats}>
                        <li className={styles.displayName}>Hello, {user.displayName}</li>
                        <li>
                            <button className={styles.themeBtn} onClick={toggleMode} aria-label="Toggle Theme">
                                {mode === 'dark' ? <IoMdSunny size={18} /> : <IoMdMoon size={18} />}
                            </button>
                        </li>
                        <li>
                            <button className={styles.logoutBtn} onClick={logout}>
                                <IoMdLogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </li>
                    </div>
                )}
            </ul>
        </nav>
    )
}
