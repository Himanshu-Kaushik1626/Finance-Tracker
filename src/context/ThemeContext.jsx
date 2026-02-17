import { createContext, useReducer, useEffect } from 'react'

export const ThemeContext = createContext()

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload }
        default:
            return state
    }
}

export function ThemeProvider({ children }) {
    // Check local storage for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light'

    const [state, dispatch] = useReducer(themeReducer, {
        mode: savedTheme
    })

    useEffect(() => {
        localStorage.setItem('theme', state.mode)
        // Apply theme class to body
        if (state.mode === 'dark') {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [state.mode])

    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    }

    return (
        <ThemeContext.Provider value={{ ...state, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}
