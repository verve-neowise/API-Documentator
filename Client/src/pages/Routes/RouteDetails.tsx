import { Response } from "../../models/Api"
import { useState } from "react"
import ResponseItem from "./Response/ResponseItem"
import ResponseBody from "./Response/ResponseBody"
import Button from "../../components/Button"
import { Plus } from "lucide-react"
import { useResponseDialog } from "../../dialogs/ResponseDialog"

type Props = {
    resource: string
    route: string
    responses: Response[]
    collapse: boolean
}

export default ({ collapse, responses, resource, route }: Props) => {

    const [selected, setSelect] = useState<Response | undefined>(responses[0])
    const { changeVisiblity } = useResponseDialog()

    return ( 
         <>
            <div className={ "p-3 " +  (collapse ? 'hidden' : '') }>
                <div className="flex gap-2 text-sm">
                    {
                        responses.map(response => (
                            <ResponseItem
                                key={response.id} 
                                response={response} 
                                isActive={response.id == selected?.id}
                                onClick={setSelect}/>
                        ))
                    }
                    <Button 
                        onClick={() => changeVisiblity(true, resource, route)} 
                        size="xs" 
                        variant="primary" 
                        icon={ <Plus size="14"/> }
                    />
                </div>
                <div className="mt-1 text-xs rounded">
                {
                    responses.map(response => (
                        <ResponseBody
                            key={response.id}
                            resourceId={resource}
                            routeId={route}
                            response={response}
                            isActive={response.id == selected?.id}/>
                    ))
                }
                </div>
            </div>
        </>
    )
}