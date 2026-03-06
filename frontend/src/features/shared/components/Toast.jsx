import { useEffect, useState } from 'react'
import './Toast.scss'

export let toastQueue = []
export let toastListeners = []

export function showToast(message, type = 'success') {
    const toast = { id: Date.now(), message, type }
    toastQueue = [...toastQueue, toast]
    toastListeners.forEach(fn => fn([...toastQueue]))
}

export default function Toast() {
    const [toasts, setToasts] = useState([])

    useEffect(() => {
        toastListeners.push(setToasts)
        return () => {
            toastListeners = toastListeners.filter(fn => fn !== setToasts)
        }
    }, [])

    useEffect(() => {
        if (!toasts.length) return
        const timer = setTimeout(() => {
            toastQueue = toastQueue.slice(1)
            setToasts([...toastQueue])
        }, 3000)
        return () => clearTimeout(timer)
    }, [toasts])

    return (
        <div className="toast-wrap">
            {toasts.map(t => (
                <div key={t.id} className={`toast toast--${t.type}`}>
                    <span className="toast__dot" />
                    {t.message}
                </div>
            ))}
        </div>
    )
}