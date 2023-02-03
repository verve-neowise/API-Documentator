import { createContext, useContext, useState } from "react";
import { useTitle } from "react-haiku";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../models/Breadcrumb";
import { ChildrenProps } from "../../models/Props";

export type BreadcrumbState = {
    breadcrumbs: Breadcrumb[],
    push: (title: string, path: string) => void,
    navigate: (path: string) => void
    root: (title: string, path: string) => void
}

const initialState: BreadcrumbState = {} as BreadcrumbState

export const BreadcrumbContext = createContext<BreadcrumbState>(initialState)

export const useBreadcrumbContext = () => useContext(BreadcrumbContext)

export const BreadcrumbProvider = ( { children } : ChildrenProps ) => {

    const navigate = useNavigate()

    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

    const last = breadcrumbs.at(-1)

    const title = last ? 'Api Documentator | ' + last.title : 'Api Documentator'

    useTitle(title)

    const navigateTo = (path: string) => {
        const index = breadcrumbs.findIndex(breadcrumb => breadcrumb.path == path)
        if (index != -1) {
            setBreadcrumbs(state => state.slice(0, index + 1))
            navigate(path)
        }
    }

    const push = (title: string, path: string) => {
        setBreadcrumbs((state) => [...state, { title, path }])
        navigate(path)
    }

    const root = (title: string, path: string) => {
        setBreadcrumbs([{ title, path }])
        navigate(path)
    }

    const state: BreadcrumbState = {
        breadcrumbs,
        navigate: navigateTo,
        push,
        root
    }

    return (
        <BreadcrumbContext.Provider value={state}>
            {children}
        </BreadcrumbContext.Provider>
    )
}