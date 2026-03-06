import axios from 'axios';

let api = axios.create({
    baseURL: '/api/auth',
    withCredentials: true
});

export async function login(identifier, password) {
    try {
        let data = await api.post('/login', {
            identifier,
            password
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}

export async function register(username, email, password) {
    try {
        let data = await api.post('/register', {
            username,
            email,
            password
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}

export async function getme() {
    try {
        let data = await api.get('/get-me');
        return data.data;
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        let data = await api.get('/logout');
        return data.data;
    } catch (error) {
        throw error;
    }
}