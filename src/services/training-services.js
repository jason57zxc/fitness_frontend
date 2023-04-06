import AuthServices from "./auth-services"
import { API_URL } from "../../config"
const API_PATH = '/training'
//const API_TOKEN = AuthServices.getToken()
const API_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

class TrainingService {
    getTraining(year, month) {
        if (!AuthServices.getToken()) {
            console.error('Token is not available')
            return
        }
        if (!year || !month) return
        return fetch(`${API_URL + API_PATH}?year=${year}&month=${month}&uid=${AuthServices.getCurrentUserID()}`, {
            method: 'GET',
            headers: Object.assign({
                'Authorization': AuthServices.getToken()
            }, API_HEADER),
        })
    }
    addTraining(data) {
        if (!AuthServices.getToken()) {
            console.error('Token is not available')
            return
        }
        return fetch(API_URL + API_PATH, {
            method: 'POST',
            headers: Object.assign({
                'Authorization': AuthServices.getToken()
            }, API_HEADER),
            body: JSON.stringify(data)
        })
    }
    delete(data) {
        // data 
        // {
        //      tid: '',
        //      setId: ''
        // }
        //debugger
        if (!AuthServices.getToken()) {
            console.error('Token is not available')
            return
        }

        return fetch(API_URL + API_PATH, {
            method: 'DELETE',
            headers: Object.assign({
                'Authorization': AuthServices.getToken()
            }, API_HEADER),
            body: JSON.stringify(data)
        })
    }
    // register(username, email, password) {
    //     return fetch(API_URL, {
    //         method: 'POST',
    //         headers: API_HEADER,
    //         body: JSON.stringify({
    //             username,
    //             email,
    //             password,
    //             role: 'student'
    //         }),
    //     })
    // }
    // logout() {
    //     localStorage.removeItem('user')
    // }
    // getCurrentUser() {
    //     return JSON.parse(localStorage.getItem('user'))
    // }
}

export default new TrainingService()