import { useState } from 'react'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useAuthContext } from '../hooks/useAuthContext'

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            // sign the user out
            await signOut(auth)

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })

            setIsPending(false)
            setError(null)
        }
        catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    return { logout, error, isPending }
}
