import { Auth, User } from "../models/Auth";

export const storeAuth = (auth: Auth) => {
    localStorage.setItem('user', JSON.stringify(auth.user))
    localStorage.setItem('token', JSON.stringify(auth.token))
}

export const getUser = () : User | null => {
    return JSON.parse(localStorage.getItem('user') ?? "null")
}

export const getToken = () : string | null => {
    return JSON.parse(localStorage.getItem('token') ?? "null")
}

export const removeAuth = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}