import { useState } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            // login
            const res = await signInWithEmailAndPassword(auth, email, password)

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            setIsPending(false)
            setError(null)
        }
        catch (err) {
            console.error(err)
            let errorMessage = err.message
            if (err.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password.'
            } else if (err.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email.'
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'The email address is invalid.'
            }
            else if (err.code === 'auth/operation-not-allowed') {
                errorMessage = 'Email/Password sign-in is not enabled.'
            }
            setError(errorMessage)
            setIsPending(false)
        }
    }

    return { login, error, isPending }
}
