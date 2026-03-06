import { useContext, useEffect } from 'react'
import { getme, login, logout, register } from '../services/auth.api'
import { Authcontext } from '../auth.context'

export let useAuth = () => {
    let context = useContext(Authcontext)
    let { loading, setloading, user, setuser } = context

    let handleregister = async (username, email, password) => {
        try {
            let data = await register(username, email, password)
            setuser(data.user)
            setloading(false)
        } catch (error) {
            setloading(false)
            throw error
        }
    }

    let handlelogin = async (identifier, password) => {
        try {
            let data = await login(identifier, password)
            setuser(data.user)
            setloading(false)
        } catch (error) {
            setloading(false)
            throw error
        }
    }

    let handlegetme = async () => {
        try {
            let data = await getme()
            setuser(data.user)
        } catch (error) {
            setuser(null)
        } finally {
            setloading(false)
        }
    }

    let handlelogout = async () => {
        try {
            await logout()
            setuser(null)
            setloading(false)
        } catch (error) {
            setloading(false)
            throw error
        }
    }

    useEffect(() => {
        handlegetme()
    }, [])

    return {
        handlegetme,
        handlelogin,
        handleregister,
        handlelogout,
        user,
        loading
    }
}