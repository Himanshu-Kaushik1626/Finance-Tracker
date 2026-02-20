import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useEffect } from 'react'

// pages & components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'

function App() {
    const { authIsReady, user } = useAuthContext()

    // Dynamic Background Logic
    useEffect(() => {
        const hour = new Date().getHours()
        const body = document.body

        // Remove existing theme classes
        body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night')

        if (hour >= 5 && hour < 12) {
            body.classList.add('theme-morning')
        } else if (hour >= 12 && hour < 17) {
            body.classList.add('theme-afternoon')
        } else if (hour >= 17 && hour < 20) {
            body.classList.add('theme-evening')
        } else {
            body.classList.add('theme-night')
        }
    }, []) // Run once on mount

    return (
        <div className="App">
            {!authIsReady && <div>Loading...</div>}
            {authIsReady && (
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={user ? <Home /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/login"
                            element={!user ? <Login /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/signup"
                            element={!user ? <Signup /> : <Navigate to="/" />}
                        />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
}

export default App
