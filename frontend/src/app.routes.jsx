import { createBrowserRouter } from 'react-router-dom'
import Login from './features/Auth/Pages/Login'
import Register from './features/Auth/Pages/Register'
import Landing from './features/Auth/Pages/Landing'
import FaceExpression from './features/Expression/Components/FaceExpression'
import Protected from './features/Auth/Pages/Protected'
import Home from './features/home/Pages/Home'

export let Router = createBrowserRouter([
    {
        path: '/',
        element: <Protected><Home /> </Protected>
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signin',
        element: <Landing />
    }
   
])