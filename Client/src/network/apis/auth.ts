import axios from '../axios'

export type LoginDto = {
    email: string
    password: string
}

export type RegisterDto = {
    email: string
    password: string
}

export const loginApi = async (dto: LoginDto) => {
    return axios.post('/auth/login', dto)
}

export const registerApi = async (dto: RegisterDto) => {
    return axios.post('/auth/register', dto)
}