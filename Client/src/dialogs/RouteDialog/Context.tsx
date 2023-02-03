import { createContext, useContext, useState } from "react"
import { useRoutesContext } from "../../context/RoutesContext"
import { Route } from "../../models/Api"
import { ChildrenProps } from "../../models/Props"

export type RouteDialogCtx = {
    state: DialogState,
    changeVisiblity: (show: boolean, resourceId: string, target?: Route) => void
    createRoute: (resourceId: string, route: Route) => void
    updateRoute: (resourceId: string, route: Route) => void
}

export type DialogState = {
    show: boolean,
    resourceId: string,
    target?: Route
}

export const RouteDialogContext = createContext<RouteDialogCtx>({} as RouteDialogCtx)

export const useRouteDialog = () => useContext(RouteDialogContext)

export const RouteDialogProvider = ( { children } : ChildrenProps ) => {

    const { updateRoute, addRoute } = useRoutesContext()

    const [ state, setState ] = useState<DialogState>({ show: false, resourceId: "" })

    const changeVisiblity = (show: boolean, resourceId: string, target?: Route) => {
        setState({ show, resourceId, target })
    }

    const context: RouteDialogCtx = {
        state,
        changeVisiblity,
        updateRoute,
        createRoute: addRoute
    }

    return (
        <RouteDialogContext.Provider value={context}>
            {children}
        </RouteDialogContext.Provider>
    )
}