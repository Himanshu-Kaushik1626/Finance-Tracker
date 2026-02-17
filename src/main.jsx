import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <AuthContextProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </AuthContextProvider>
        </ErrorBoundary>
    </React.StrictMode>,
)
