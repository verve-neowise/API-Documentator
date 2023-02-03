import { createContext, useContext, useState } from "react"
import { useResourcesContext } from "../../context/ResourcesContext"
import { Response } from "../../models/Api"
import { ChildrenProps } from "../../models/Props"

export type ResponseDialogCtx = {
    state: DialogState,
    changeVisiblity: (show: boolean, resourceId?: string, routeId?: string, target?: Response) => void
    createResponse: (resourceId: string, routeId: string, target: Response) => void
    updateResponse: (resourceId: string, routeId: string, target: Response) => void
    deleteResponse: (resourceId: string, routeId: string, target: Response) => void
}

export type DialogState = {
    show: boolean,
    resourceId?: string,
    routeId?: string,
    target?: Response
}

export const ResponseDialogContext = createContext<ResponseDialogCtx>({} as ResponseDialogCtx)

export const useResponseDialog = () => useContext(ResponseDialogContext)

export const ResponseDialogProvider = ( { children } : ChildrenProps ) => {

    const [ state, setState ] = useState<DialogState>({ show: false, resourceId: "", routeId: "" })

    const { resources, setResources, setHasChanges } = useResourcesContext()

    const changeVisiblity = (show: boolean, resourceId?: string, routeId?: string, target?: Response) => {
        setState({ show, resourceId, routeId, target })
    }

    const createResponse = (resourceId: string, routeId: string, target: Response) => {
       
        const resource = resources.find(res => res.id == resourceId)
        
        if (resource) {
            const route = resource.routes.find(resp => resp.id == routeId)
            if (route) {
                route.responses?.push(target)
                setResources([...resources])
                setHasChanges(true)
            }
        }
    }

    const updateResponse = (resourceId: string, routeId: string, target: Response) => {

        const resource = resources.find(res => res.id == resourceId)
        if (resource) {
            const route = resource.routes.find(resp => resp.id == routeId)
            if (route) {
                route.responses = route.responses?.map(resp => resp.id != target.id ? resp : target)
                setResources([...resources])
                setHasChanges(true)
            }
        }
    }

    const deleteResponse = (resourceId: string, routeId: string, target: Response) => {
        console.log('delete response');

        const resource = resources.find(res => res.id == resourceId)
        if (resource) {
            const route = resource.routes.find(resp => resp.id == routeId)
            if (route) {
                route.responses = route.responses?.filter(resp => resp.id != target.id)
                setResources([...resources])
                setHasChanges(true)
            }
        }
    }

    const context: ResponseDialogCtx = {
        state,
        changeVisiblity,
        createResponse,
        updateResponse,
        deleteResponse
    }

    return (
        <ResponseDialogContext.Provider value={context}>
            {children}
        </ResponseDialogContext.Provider>
    )
}