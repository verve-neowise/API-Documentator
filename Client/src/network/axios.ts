import axios from "axios";
import { getToken } from "../storage";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'authorization': getToken()
    }
})

export default instance