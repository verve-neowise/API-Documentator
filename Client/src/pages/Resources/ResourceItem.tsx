import { Pencil, Plus, Trash } from "lucide-react"
import Button from "../../components/Button"
import { useResourcesContext } from "../../context/ResourcesContext"
import { useRoutesContext } from "../../context/RoutesContext"
import { useResourceDialog } from "../../dialogs/ResourceDialog"
import { useRouteDialog } from "../../dialogs/RouteDialog"
import { Resource, Route } from "../../models/Api"
import RouteItem from "../Routes/RouteItem"

type Props = {
    resource: Resource
}

export default ({ resource } : Props) => {

    const { removeResource, ownship } = useResourcesContext()
    const { changeVisiblity } = useResourceDialog()
    const { removeRoute } = useRoutesContext()
    const { changeVisiblity : changeRouteVisiblity } = useRouteDialog()

    return (
        <>
            <div className="flex justify-between py-4 px-3 group transition-all duration-150 rounded-md">
                <h4 className="text-lg font-bold"> {resource.name}  </h4>
                { 
                    ownship && (
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-150">
                            <Button onClick={() => removeResource(resource)} variant="red" size="sm" icon={<Trash size="14"/>}/>
                            <Button onClick={() => changeVisiblity(true, resource)} variant="secondary" size="sm" icon={<Pencil size="14"/>}/>
                            <Button onClick={() => changeRouteVisiblity(true, resource.id)} variant="primary" size="sm" className="justify-center" icon={<Plus size="14"/>}> Route </Button>
                        </div>
                    )
                }
            </div>
            {
                resource.routes.length == 0 && 
                    <div className="text-slate-300 text-center text-sm"> No routes </div> 
            }
            {
                resource.routes.length > 0 && (
                    <div className="flex flex-col gap-3 text-sm mt-3 mb-3">
                        {
                            resource.routes.map(route => (
                                <RouteItem 
                                    resourceId={resource.id}
                                    onEdit={() => changeRouteVisiblity(true, resource.id, route)} 
                                    onDelete={() => removeRoute(resource.id, route)} 
                                    key={route.id} 
                                    route={route}
                                    />
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}