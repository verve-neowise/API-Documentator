import { createContext, useContext, useState } from "react"
import { useResourcesContext } from "../../context/ResourcesContext"
import { Resource } from "../../models/Api"
import { ChildrenProps } from "../../models/Props"

export type ResourceDialogCtx = {
    state: DialogState,
    changeVisiblity: (show: boolean, target?: Resource) => void
    updateResource: (resource: Resource) => void
}

export type DialogState = {
    show: boolean,
    target?: Resource
}

export const ResourceDialogContext = createContext<ResourceDialogCtx>({} as ResourceDialogCtx)

export const useResourceDialog = () => useContext(ResourceDialogContext)

export const ResourceDialogProvider = ( { children } : ChildrenProps ) => {

    const { updateResource } = useResourcesContext()

    const [ state, setState ] = useState<DialogState>({ show: false })

    const changeVisiblity = (show: boolean, target?: Resource) => {
        setState({ show, target })
    }

    const context: ResourceDialogCtx = {
        state,
        changeVisiblity,
        updateResource,
    }

    return (
        <ResourceDialogContext.Provider value={context}>
            {children}
        </ResourceDialogContext.Provider>
    )
}