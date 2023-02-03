import { Visibility } from "@prisma/client"

export interface ApiDto {
    name: string
    description: string
    visibility: Visibility
}

export interface UpdateApiDto {
    name: string
    description: string
    visibility: Visibility
}

export interface UpdateResourceDto {
    resources: Resource[]
}

export interface ApiResponse {
    id: number
    uid: number
    name: string
    description: string
    visibility: Visibility
    file: string
}

export interface Resource {
    id: string
    name: string
    routes: Route[]
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface Route {
    id: string
    method: Method
    path: string
    about: string
    access?: string[]
    request?: string
    responses: Response[]
}

export interface Response {
    id: string
    code: number
    description: string
    body: string
}