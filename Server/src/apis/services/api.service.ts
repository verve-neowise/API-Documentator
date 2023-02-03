import client from "@shared/database";
import { ApiDto, UpdateApiDto } from "apis/models/api";

export const getOwnshipByUid = async (userId: number, uid: string) => {
    const api = await findApiByUid(uid)

    if (!api) {
        return null
    }

    return userId == api.userId
}

export const getOwnshipById = async (userId: number, id: number) => {
    const api = await findApiById(id)

    if (!api) {
        return null
    }

    return userId == api.userId
}

export const createApi = async (userId: number, apiDto: ApiDto, filename: string) => {
    return client.api.create({
        data: {
            name: apiDto.name,
            description: apiDto.description,
            file: filename,
            visibility: apiDto.visibility,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })
}

export const deleteApi = async (userId: number, apiId: number) => {

    const api = await client.api.findFirst({
        where: {
            id: apiId,
            userId
        }
    })

    if (api) {
        return client.api.delete({
            where: {
                id: apiId
            }
        })
    }
    return null
}

export const findAllUserApis = async (userId: number) => {
    return client.api.findMany({
        where: {
            userId
        }
    })
}


export const findPublicApis = async () => {
    return client.api.findMany({
        where: {
            visibility: 'public'
        }
    })
}

export const findApiById = async (id: number) => {
    return client.api.findUnique({
        where: {
            id
        }
    })
}

export const findApiByUid = async (uid: string) => {
    return client.api.findUnique({
        where: {
            uid
        }
    })
}

export const updateApiById = async (id: number, apiDto: UpdateApiDto) => {
    return client.api.update({
        where: {
            id
        },
        data: {
            name: apiDto.name,
            description: apiDto.description,
            visibility: apiDto.visibility
        }
    })
}

export const updateApiByUid = async (uid: string, apiDto: UpdateApiDto) => {
    return client.api.update({
        where: {
            uid
        },
        data: {
            name: apiDto.name,
            description: apiDto.description,
            visibility: apiDto.visibility
        }
    })
}