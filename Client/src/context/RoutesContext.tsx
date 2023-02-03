import { createContext, useContext } from "react";
import { Route } from "../models/Api";
import { ChildrenProps } from "../models/Props";
import { useResourcesContext } from "./ResourcesContext";

export type RoutesCtx = {
    addRoute: (resourceId: string, route: Route) => void
    updateRoute: (resourceId: string, route: Route) => void
    removeRoute: (resourceId: string, route: Route) => void
  }

const initialValue: RoutesCtx = {} as RoutesCtx 

export const RoutesContext = createContext(initialValue)

export const useRoutesContext = () => useContext(RoutesContext)

export const RoutesProvider = ( { children }: ChildrenProps ) => {

  const { resources, setResources, setHasChanges } = useResourcesContext()

  const addRoute = (resourceId: string, route: Route) => {
    const resource = resources.find(res => res.id == resourceId)
    if (resource) {
      resource.routes.push(route)
      setHasChanges(true)
      setResources([...resources])
    }
  }

  const updateRoute = (resourceId: string, route: Route) => {
    const resource = resources.find(res => res.id == resourceId)
    if (resource) {
      resource.routes = resource.routes.map(rt => rt.id == route.id ? route : rt )
      setHasChanges(true)
      setResources([...resources])
    }
  }

  const removeRoute = (resourceId: string, route: Route) => {
    const resource = resources.find(res => res.id == resourceId)
    if (resource) {
      resource.routes = resource.routes.filter(rte => rte.id != route.id)
      setHasChanges(true)
      setResources([...resources])
    }
  }

  const value: RoutesCtx = {
    addRoute,
    updateRoute,
    removeRoute
  }

  return (
    <>
      <RoutesContext.Provider value={value}>
          {children}
      </RoutesContext.Provider>
    </>
    )
}