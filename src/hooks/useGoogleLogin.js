import { useState } from 'react'
import { auth } from '../firebase/config'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'

export const useGoogleLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const googleLogin = async () => {
        setError(null)
        setIsPending(true)

        try {
            const provider = new GoogleAuthProvider()
            const res = await signInWithPopup(auth, provider)

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            setIsPending(false)
            setError(null)
        }
        catch (err) {
            console.error(err)
            setError(err.message)
            setIsPending(false)
        }
    }

    return { googleLogin, error, isPending }
}