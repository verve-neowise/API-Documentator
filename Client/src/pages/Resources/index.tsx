import { Plus, UploadCloud } from "lucide-react"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import BackButton from "../../components/BackButton"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Title from "../../components/Title"
import { useResourcesContext } from "../../context/ResourcesContext"
import { ApiResponse, Resource, Route } from "../../models/Api"
import { getApiById } from "../../network/apis/apis"
import { ErrorType, useGet } from "../../network/queries/baseQuery"
import ResourceItem from "./ResourceItem"
import { v4 as uuid } from 'uuid'
import ResourceDialog from "../../dialogs/ResourceDialog/ResourceDialog"
import RouteDialog from "../../dialogs/RouteDialog/RouteDialog"
import { ResponseDialog } from "../../dialogs/ResponseDialog"

export default ({ backPath } : { backPath: string }) => {

    const { id } = useParams()

    const {
        resources, hasChanges, ownship, 
        addResource, setResources, 
        setHasChanges, setOwnship,
        api, setApi
    } = useResourcesContext()

    useGet('get-api', getApiById(id!), {
        onResponse(response: ApiResponse) {
            setApi(response.api)
            setResources(response.resources)
            setHasChanges(false)
            setOwnship(response.ownship)
        },
        onError(error: ErrorType) {
            alert(error.message)
        }
    })

    const resourceRef = useRef<HTMLInputElement>(null)

    const onAddResource = () => {
        const name = resourceRef.current!.value.trim()
        
        if (name.length > 0) {
            addResource({
                id: uuid(),
                name,
                routes: []
            })
            resourceRef.current!.value = ''
        }
    }

    const saveChanges = () => {
        saveChanges()
    }

    return (
            <div className="container mx-auto">
                {
                    api && (
                        <div>
                            <BackButton title="API's" link={backPath}/>
                            <div className="flex justify-between items-center">
                                <Title>{api.name}</Title>
                                {
                                    ownship && (
                                        hasChanges && 
                                            <h2 className="text-xs p-2 bg-blue-50/75 text-blue-300 rounded"> 
                                                <UploadCloud size="14"/>
                                            </h2>
                                        // <Button 
                                        //     size="sm" 
                                        //     disabled={!hasChanges}
                                        //     onClick={saveChanges}
                                        // > Save Changes </Button>
                                    )
                                }
                            </div>
                            <span> {api.description} </span>

                            <div className="w-[700px] mx-auto mt-10">
                                {
                                    ownship && (
                                        <div className="flex gap-3 mb-5">
                                            <Input ref={resourceRef} className="grow" placeholder="name"/>
                                            <Button
                                                size="sm"
                                                onClick={onAddResource}
                                                icon={<Plus size="14"/>} 
                                                variant="success"
                                                > Resource </Button>
                                        </div>
                                    )
                                }
                                {
                                    resources.map(resource => (
                                        <ResourceItem 
                                            key={resource.id} 
                                            resource={resource}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                <ResourceDialog/>
                <RouteDialog/>
                <ResponseDialog/>
            </div>
    )
}