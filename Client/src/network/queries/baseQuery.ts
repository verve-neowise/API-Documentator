import { AxiosError, AxiosResponse } from "axios"
import { useMutation, useQuery } from "react-query"

export type OnResponse<T> = (data: T, status: number) => void
export type OnError = (error: any, status: number) => void

export type ErrorType = {
    message: string
}

export type Options<R> = {
    onResponse?: OnResponse<R>
    onError?: OnError,
}

const queryOptions = <R>(options? : Options<R>) =>  {
    if (!options) {
        return { }
    }
    
    const { onResponse, onError } = options

    return {
        onSuccess: (response: AxiosResponse) => {
            if (onResponse) onResponse(response.data, response.status)
        },
        onError: (error: AxiosError) => {
            if (onError) {
                if (error.response) {
                    onError(error.response.data, error.response.status)
                }
                else {
                    onError(error.message, -1)
                }
            }
        }
    }
}

export const useGet = <R>(
    name: string,
    query: Promise<AxiosResponse<any>>,
    options? : Options<R> ,
    enabled: boolean = true,
    ) => {
        return useQuery(name, () => query, { enabled, ...queryOptions(options) })
}

export const usePost = <T, R>(
    query: (data: T) => Promise<AxiosResponse<any>>,
    options?: Options<R> 
    ) => {
        return useMutation(query, queryOptions(options))
}