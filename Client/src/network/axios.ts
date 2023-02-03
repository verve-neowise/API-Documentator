import axios from "axios";
import { getToken } from "../storage";

const instance = axios.create({
    baseURL: 'http://neowise.uz:4441/api/v1',
    headers: {
        'authorization': getToken()
    }
})

export default instance