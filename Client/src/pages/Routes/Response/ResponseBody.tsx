import { Response } from "../../../models/Api"
import ReactSyntaxHighlighter from "react-syntax-highlighter"
import { xcode } from "react-syntax-highlighter/dist/esm/styles/hljs"
import Button from "../../../components/Button"
import { Pencil, Trash } from "lucide-react"
import { useResponseDialog } from "../../../dialogs/ResponseDialog"

type Props = {
    isActive: boolean
    response: Response
    resourceId: string
    routeId: string
}

export default ({ response, isActive, resourceId, routeId } : Props) => {

    const { deleteResponse, changeVisiblity } = useResponseDialog()

    const activeClass = isActive ? 'block' : 'hidden'

   return (
    <div className={activeClass}>
        <div className="py-3 text-slate-400 text-sm">
            {response.description}
        </div>
        <div className="text-xs h-40 overflow-y-auto border border-slate-100 rounded">
        {
            isActive ? (
                <ReactSyntaxHighlighter language="json" style={xcode}>
                    {response.body}
                </ReactSyntaxHighlighter>
            ) : (
                <></>
            )
        }
        </div>
        <div className="flex justify-end gap-3 mt-3">
            <Button variant="neutral" onClick={ () => changeVisiblity(true, resourceId, routeId, response) } size="xs" icon={<Pencil size="14"/>}/>
            <Button variant="red" onClick={ () => deleteResponse(resourceId, routeId, response) } size="xs" icon={<Trash  size="14"/>}/>
        </div>
    </div>
   )
}