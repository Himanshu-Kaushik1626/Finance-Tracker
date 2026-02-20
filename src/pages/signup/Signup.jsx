import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useGoogleLogin } from '../../hooks/useGoogleLogin'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const { signup, isPending, error } = useSignup()
    const { googleLogin, googleError, googleIsPending } = useGoogleLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName)
    }

    const handleGoogleLogin = () => {
        googleLogin()
    }

    return (
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 80px)' }}>
            <div className="blob blob-1" style={{ top: '60%', left: '5%' }}></div>
            <div className="blob blob-2" style={{ top: '10%', right: '10%' }}></div>
            <form onSubmit={handleSubmit} className="auth-form animate-fade-in">
                <h2>Sign up</h2>
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
                <label>
                    <span>display name:</span>
                    <input
                        type="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
                </label>
                {!isPending && <button className="btn">Sign up</button>}
                {isPending && <button className="btn" disabled>loading</button>}
                {error && <div className="error">{error}</div>}
                <div style={{ margin: '20px 0', textAlign: 'center' }}>or</div>
                {!googleIsPending && <button className="btn google-btn" onClick={handleGoogleLogin}>Sign up with Google</button>}
                {googleIsPending && <button className="btn google-btn" disabled>Signing up...</button>}
                {googleError && <div className="error">{googleError}</div>}
            </form>
        </div>
    )
}
