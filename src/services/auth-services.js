import { API_URL } from "../../config"
const API_PATH = '/user'
const API_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
}

class AuthService {
    login(email, password) {
        return fetch(API_URL + API_PATH + '/login', {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({ email, password }),
        })
    }
    register(username, email, password) {
        return fetch(API_URL + API_PATH + '/register', {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({
                username,
                email,
                password,
                role: 'student'
            }),
        })
    }
    logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }
    getCurrentUserID() {
        return this.getCurrentUser()._id
    }
    getToken() {
        return JSON.parse(localStorage.getItem('token'))
    }
}

export default new AuthService()