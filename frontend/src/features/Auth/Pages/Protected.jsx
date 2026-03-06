import React from 'react'
import { useAuth } from '../hooks/Useauth'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
    let { user, loading } = useAuth()
    if (loading) {
        return <h1>Loading</h1>
    }
    if (!user) {
        return <Navigate to='/signin' />
    }
    return children

}

export default Protected
