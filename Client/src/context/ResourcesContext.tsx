import { createContext, useContext, useState } from "react";
import { Api, ApiResponse, Resource } from "../models/Api";
import { ChildrenProps } from "../models/Props";
import { updateResources } from "../network/apis/apis";
import { ErrorType, usePost } from "../network/queries/baseQuery";

export type ResourcesCtx = {
    resources: Resource[]
    hasChanges: boolean,
    ownship: boolean,
    api: Api | null,
    setApi: (api: Api | null) => void,
    setOwnship: (ownship: boolean) => void,
    setHasChanges: (hasChanges: boolean) => void
    setResources: (resources: Resource[]) => void
    addResource: (resource: Resource) => void
    saveChanges: () => void
    updateResource: (resource: Resource) => void
    removeResource: (resource: Resource) => void
  }

const initialValue: ResourcesCtx = {} as ResourcesCtx

export const ResourcesContext = createContext(initialValue)

export const useResourcesContext = () => useContext(ResourcesContext)

export const ResourcesProvider = ( { children }: ChildrenProps ) => {

  const [hasChanges, setHasChanges] = useState(false)
  const [ownship, setOwnship] = useState(false)
  const [api, setApi] = useState<Api | null>(null)

  const [resources, setResources] = useState<Resource[]>([])

  const addResource = (resource: Resource) => {
    setHasChanges(true)
    setResources(state => [resource, ...state])
  }

  const removeResource = (resource: Resource) => {
    setHasChanges(true)
    setResources(state => state.filter((v) => v.id !== resource.id))
  }

  const updateResource = (resource: Resource) => {
    setResources(resources.map(res => res.id == resource.id ? resource : res))
    setHasChanges(true)
  }

  const saveMutation = usePost((id: string) => updateResources(id, { resources }), {
    onResponse(response: ApiResponse) {
        setHasChanges(false)
    },
    onError(error: ErrorType) {
        alert(error.message)
    }
  })

  const saveChanges = () => {
    if (api) {
      saveMutation.mutate(api?.uid)
    }
  }

  setInterval(() => {
    if (hasChanges) {
      saveChanges()
    }
  }, 5000)

  const value: ResourcesCtx = {
    hasChanges,
    ownship,
    api,
    setApi,
    setOwnship,
    setHasChanges,
    resources,
    saveChanges,
    updateResource,
    setResources,
    addResource,
    removeResource
}

  return (
    <>
      <ResourcesContext.Provider value={value}>
          {children}
      </ResourcesContext.Provider>
    </>
    )
}