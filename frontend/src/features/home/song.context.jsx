import { createContext, useState } from "react";
export let SongContext = createContext()

export let SongContextProvider = (props) => {
    const [song, setsong] = useState(null)
    const [loading, setloading] = useState(false)
    const [history, sethistory] = useState([])
    const [favorites, setfavorites] = useState([])
    const [moodStats, setMoodStats] = useState({
        happy: 0, sad: 0, angry: 0,
        neutral: 0, surprised: 0, calm: 0,
    })

    return (
        <SongContext.Provider value={{
            song, setsong,
            loading, setloading,
            history, sethistory,
            favorites, setfavorites,
            moodStats, setMoodStats
        }}>
            {props.children}
        </SongContext.Provider>
    )
}