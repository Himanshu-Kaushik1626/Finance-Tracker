import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useGoogleLogin } from '../../hooks/useGoogleLogin'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()
    const { googleLogin, googleError, googleIsPending } = useGoogleLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    const handleGoogleLogin = () => {
        googleLogin()
    }

    return (
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 80px)' }}>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <form onSubmit={handleSubmit} className="login-form animate-fade-in">
                <h2>Login</h2>
                <label>
                    <span>email:</span>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>password:</span>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                {!isPending && <button className="btn">Login</button>}
                {isPending && <button className="btn" disabled>loading</button>}
                {error && <div className="error">{error}</div>}
                <div style={{ margin: '20px 0', textAlign: 'center' }}>or</div>
                {!googleIsPending && <button className="btn google-btn" onClick={handleGoogleLogin}>Login with Google</button>}
                {googleIsPending && <button className="btn google-btn" disabled>Logging in...</button>}
                {googleError && <div className="error">{googleError}</div>}
            </form>
        </div>
    )
}
