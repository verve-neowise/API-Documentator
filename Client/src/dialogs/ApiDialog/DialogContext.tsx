import { createContext, useContext, useState } from "react"
import { useApisContext } from "../../context/ApisContext"
import { Api, ApiResponse } from "../../models/Api"
import { ApiDto, createApis, updateApi, UpdateApiDto } from "../../network/apis/apis"
import { ErrorType, usePost } from "../../network/queries/baseQuery"
import { ChildrenProps } from "../../models/Props"

export type ApiDialogCtx = {
    state: DialogState,
    changeVisiblity: (show: boolean, target?: Api) => void
    createApi: (name: string, description: string, visibility: string) => void
    updateApi: (apiId: string, name: string, description: string, visibility: string) => void
}

export type DialogState = {
    show: boolean,
    target?: Api
}

export const ApiDialogContext = createContext<ApiDialogCtx>({} as ApiDialogCtx)

export const useApiDialog = () => useContext(ApiDialogContext)

export const ApiDialogProvider = ( { children } : ChildrenProps ) => {

    const { addApi, replaceApi } = useApisContext()

    const [ state, setState ] = useState<DialogState>({ show: false })

    const createMutation = usePost((data: ApiDto) => createApis(data), {
        onResponse(response: ApiResponse) {
            addApi(response.api)
            setState({
                show: false
            })
        },
        onError(error: ErrorType) {
            alert(error.message)
        }
    })

    const updateMutation = usePost((data: UpdateApiDto) => updateApi(data.id, data), {
        onResponse(response: ApiResponse) {
            replaceApi(response.api)
            setState({
                show: false
            })
        },
        onError(error: ErrorType) {
            alert(error.message)
        }
    })


    const createApi = (name: string, description: string, visibility: string) => {
        createMutation.mutate( { name, description, visibility } )
    }

    const changeApi = (apiId: string, name: string, description: string, visibility: string) => {
        updateMutation.mutate( { id: apiId, name, description, visibility } )
    }

    const changeVisiblity = (show: boolean, target?: Api) => {
        setState({ show, target })
    }

    const context: ApiDialogCtx = {
        state,
        changeVisiblity,
        createApi,
        updateApi: changeApi
    }

    return (
        <ApiDialogContext.Provider value={context}>
            {children}
        </ApiDialogContext.Provider>
    )
}
