import { useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            // signup
            const res = await createUserWithEmailAndPassword(auth, email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // add display name to user
            await updateProfile(res.user, { displayName })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            setIsPending(false)
            setError(null)
        }
        catch (err) {
            console.error(err)
            let errorMessage = err.message
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'The email address is already in use by another account.'
            } else if (err.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters.'
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'The email address is invalid.'
            }
            else if (err.code === 'auth/operation-not-allowed') {
                errorMessage = 'Email/Password sign-in is not enabled. Look in Firebase Console > Authentication > Sign-in method.'
            }
            setError(errorMessage)
            setIsPending(false)
        }
    }

    return { signup, error, isPending }
}
