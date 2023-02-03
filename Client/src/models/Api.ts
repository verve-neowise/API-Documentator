export interface Api {
    id: number
    uid: string
    name: string
    description: string
    visibility: 'public' | 'private'
    file: string
}

export interface ApiResponse {
    message: string,
    api: Api,
    resources: Resource[],
    ownship: boolean
}

export interface ApiListResponse {
    message: string,
    apis: Api[]
}

export interface Resource {
    id: string
    name: string
    routes: Route[]
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type Protection = 'public' | 'protected' | 'role'
export type Status = 'success' | 'error' | 'warning' | 'neutral'

export interface Route {
    id: string
    method: Method
    path: string
    about: string
    protection: Protection
    access?: string[]
    request?: string
    responses?: Response[]
}

export interface Response {
    id: string
    code: string
    description: string
    body: string
    status: 'success' | 'error' | 'warning' | 'neutral'
    type: 'request' | 'response'
}