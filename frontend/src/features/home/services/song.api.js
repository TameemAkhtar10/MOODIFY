import axios from 'axios'

let api = axios.create({
    baseURL: '/api',
    withCredentials: true
})

export async function getsong({ mood }) {
    let res = await api.get('/songs?mood=' + mood)
    return res.data
}

export async function getnextsong({ mood, excludeId }) {
    let res = await api.get(`/songs/next?mood=${mood}&excludeId=${excludeId}`)
    return res.data
}