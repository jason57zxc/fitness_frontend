import AuthServices from "./auth-services"
import { API_URL } from "../../config"
const API_PATH = '/move'
//const API_TOKEN = 
const API_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}


class MoveService {
    getMoves() {
        if (!AuthServices.getToken()) {
            console.error('Token is not available')
            return
        }
        return fetch(API_URL + API_PATH, {
            method: 'GET',
            headers: Object.assign({
                'Authorization': AuthServices.getToken()
            }, API_HEADER),
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

export default new MoveService()