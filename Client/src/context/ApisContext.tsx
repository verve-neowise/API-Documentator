import { createContext, useContext, useState } from "react";
import { Api, ApiListResponse, ApiResponse } from "../models/Api";
import { deleteApis, getApis } from "../network/apis/apis";
import { ErrorType, useGet, usePost } from "../network/queries/baseQuery";
import { ChildrenProps } from "../models/Props";

export type ApisCtx = {
    apis: Api[],
    addApi: (api: Api) => void
    replaceApi: (api: Api) => void
    deleteApi: (api: Api) => void
    setApis: (apis: Api[]) => void
}

const initialValue: ApisCtx = {} as ApisCtx

export const ApisContext = createContext(initialValue)

export const useApisContext = () => useContext(ApisContext)

export const ApisProvider = ( { children }: ChildrenProps ) => {

  const [apis, setApis] = useState<Api[]>([])

  const deleteMutation = usePost((id: number) => deleteApis(id), {
    onResponse(response: ApiResponse) {
        removeApi(response.api)
    },
    onError(error: ErrorType) {
        alert(error.message)
    }
  })

  const addApi = (api: Api) => {
    setApis(state => [...state, api])
  }

  const removeApi = (api: Api) => {
    setApis(state => state.filter(v => v.id !== api.id))
  }

  const deleteApi = (api: Api) => {
    deleteMutation.mutate(api.id)
  }

  const replaceApi = (api: Api) => {
    setApis(state => {
      console.log(state);
      return state.map(it => it.id == api.id ? api : it)
    })
  }

  const value: ApisCtx = {
    apis,
    addApi,
    deleteApi,
    replaceApi,
    setApis
  }

  return (
    <ApisContext.Provider value={value}>
        {children}
    </ApisContext.Provider>
  )
} 
