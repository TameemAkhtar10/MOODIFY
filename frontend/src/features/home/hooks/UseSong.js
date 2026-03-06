import { useContext } from 'react'
import { SongContext } from '../song.context'
import { getsong, getnextsong } from '../services/song.api'
import { showToast } from '../../shared/components/Toast.jsx'

export let UseSong = () => {
    let context = useContext(SongContext)
    let { song, setsong, loading, setloading, history, sethistory, favorites, setfavorites, moodStats, setMoodStats } = context

    let handlegetsong = async ({ mood }) => {
        setloading(true)
        try {
            let data = await getsong({ mood })
            if (data?.song) {
                setsong(data.song)
                sethistory(prev => {
                    const filtered = prev.filter(s => s._id !== data.song._id)
                    return [data.song, ...filtered].slice(0, 5)
                })
                setMoodStats(prev => ({
                    ...prev,
                    [mood]: (prev[mood] || 0) + 1
                }))
                showToast(`${mood} mood detected!`, 'success')
            } else {
                showToast('No song found for this mood.', 'error')
            }
        } catch {
            showToast('Failed to fetch song.', 'error')
        }
        setloading(false)
    }

    let handlegetnextsong = async () => {
        if (!song) return
        setloading(true)
        try {
            let data = await getnextsong({ mood: song.mood, excludeId: song._id })
            if (data?.song) {
                setsong(data.song)
                sethistory(prev => {
                    const filtered = prev.filter(s => s._id !== data.song._id)
                    return [data.song, ...filtered].slice(0, 5)
                })
                showToast('Next song loaded!', 'info')
            } else {
                showToast('No more songs in this mood.', 'error')
            }
        } catch {
            showToast('Failed to fetch next song.', 'error')
        }
        setloading(false)
    }

    let handlefavorite = (s) => {
        const isFav = favorites.some(f => f._id === s._id)
        if (isFav) {
            setfavorites(prev => prev.filter(f => f._id !== s._id))
            showToast('Removed from favorites.', 'info')
        } else {
            setfavorites(prev => [s, ...prev])
            showToast('Added to favorites!', 'success')
        }
    }

    let isfavorite = (s) => favorites.some(f => f._id === s?._id)

    return { handlegetsong, handlegetnextsong, handlefavorite, isfavorite, song, loading, history, favorites, moodStats }
}