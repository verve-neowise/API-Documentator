import { Resource } from "../../models/Api"
import { getToken } from "../../storage"
import axios from "../axios"

export type ApiDto = {
    name: string,
    description: string
    visibility: string
}

export type UpdateApiDto = {
    id: string,
    name: string,
    description: string
    visibility: string
}

export type UpdateResourcesDto = {
    resources: Resource[]
}

export const getApis = async () => {
    return axios.get('/apis', {
        headers: {
            'authorization': getToken()
        }
    })
}

export const getCommunityApis = async () => {
    return axios.get('/apis/community', {
        headers: {
            'authorization': getToken()
        }
    })
}

export const getApiById = async (id: string) => {
    return axios.get('/apis/' + id, {
        headers: {
            'authorization': getToken()
        }
    })
}

export const createApis = async (body: ApiDto) => {
    return axios.post('/apis', body, {
        headers: {
            'authorization': getToken()
        }
    })
}

export const deleteApis = async (id: number) => {
    return axios.delete('/apis/' + id, {
        headers: {
            'authorization': getToken()
        }
    })
}

export const updateApi = async (id: string, body: ApiDto) => {
    console.log('update api');
    return axios.put('/apis/' + id,  body, {
        headers: {
            'authorization': getToken()
        }
    })
}

export const updateResources = async (id: string, body: UpdateResourcesDto) => {
    return axios.put('/apis/' + id + '/resource',  body, {
        headers: {
            'authorization': getToken()
        }
    })
}