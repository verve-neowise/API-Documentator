import { ArrowDown, ArrowUp, Pen, Trash } from "lucide-react"
import { useState } from "react"
import Button from "../../components/Button"
import { useResourcesContext } from "../../context/ResourcesContext"
import { Method, Route } from "../../models/Api"
import RouteDetails from "./RouteDetails"

type Props = {
    resourceId: string
    route: Route,
    onDelete: () => void
    onEdit: () => void
}

type MethodColors = {
    [key in Method]: string
}

const methodColors: MethodColors = {
    'GET': 'text-blue-500',
    'POST': 'text-green-500',
    'PUT': 'text-orange-500',
    'DELETE': 'text-red-500',
    'PATCH': 'text-yellow-500'
}

export default ( { route, resourceId, onDelete, onEdit } : Props ) => {

    const methodColor = methodColors[route.method]

    const { ownship } = useResourcesContext()

    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className="relative group">
        {
            ownship && (
                <div className="absolute right-0 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-[110%] transition-all duration-300">
                    {
                        ownship && (
                            <>
                                <Button onClick={() => onDelete() } variant="red" size="sm" icon={<Trash size="14"/>}/>
                                <Button onClick={() => onEdit() } variant="neutral" size="sm" icon={<Pen size="14"/>}/>
                            </>
                        )
                    }
                    {/* <Button size="sm" icon={ collapsed ? <ArrowDown size="14"/> : <ArrowUp size="14"/> }/> */}
                </div>
            )
        }

        <div className="flex flex-col gap-2 border border-slate-200 rounded w-full">
            <div onClick={() => setCollapsed(state => !state)}  className="p-3 transition-all duration-150 active:bg-slate-50">
                <div className="flex gap-3">
                    <div className="flex">
                        <span className={ `${methodColor} font-bold rounded` }> {route.method} </span>
                    </div>

                    <span className="grow"> {route.path} </span>

                    <div className="flex gap-1 items-center text-xs">
                        {
                            route.protection == 'public' ? 
                                <span className="text-green-500 bg-green-50 font-bold p-2 rounded"> Public </span> :
                            route.protection == 'protected' ?
                                <span className="text-orange-500 bg-orange-50 font-bold p-2 rounded"> Protected </span> :
                            route.access?.map(access => (
                                <span key={access} className="text-red-500 bg-red-50 font-bold p-2 rounded"> {access} </span>
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-1 grow">
                    <span className="text-black/50"> {route.about} </span>
                </div>

            </div>
            <RouteDetails 
                resource={resourceId}
                route={route.id}
                responses={route.responses ?? []} 
                collapse={collapsed}/>
        </div>
    </div>
    )
}