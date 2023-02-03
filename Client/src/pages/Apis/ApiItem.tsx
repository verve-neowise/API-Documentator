import { BookOpen, Globe, Milestone, Pencil, Share, Trash } from "lucide-react"
import Button from "../../components/Button"
import { useApiDialog } from "../../dialogs/ApiDialog"
import { Api } from "../../models/Api"

type Props = {
    api: Api,
    onOpen: (api: Api) => void
    onShare: (api: Api) => void
    onDelete?: (api: Api) => void
}

export default ({ api, onOpen, onShare, onDelete }: Props) => {

    const { changeVisiblity } = useApiDialog()

    return (
        <div className={`
            select-none
            border border-slate-200 rounded p-3 
            transition-all duration-150 w-full`}>

            <div className="flex flex-col gap-2">
                <h3 className="text-1xl font-semibold flex gap-3 items-center">
                    {
                        api.visibility == 'private' ?
                        <span className="text-green-600"> <Milestone size="16"/> </span>  :
                        <span className="text-green-600"> <Globe size="16"/> </span>
                    }
                    {
                        api.visibility == 'private' ??
                            <span className="text-green-600"> <Milestone size="16"/> </span>
                    }

                    {api.name}
                </h3>
                <p className="text-sm"> {api.description} </p>
                <hr className="my-2"/>
                <div className="flex gap-2 justify-end"> 
                    <Button onClick={() => onOpen(api)}  size="sm" icon={<BookOpen size="16"/>}></Button>    
                    <Button onClick={() => onShare(api)}  size="sm" icon={<Share size="16"/>}></Button>    
                    {
                        onDelete && (
                            <>
                                <Button 
                                    onClick={() => changeVisiblity(true, api)}
                                    size="sm"
                                    icon={<Pencil size="16"/>}
                                    variant="secondary"
                                    />
                                <Button 
                                    onClick={() => onDelete(api)}  
                                    size="sm" icon={ <Trash size="16"/> } 
                                    variant="red"/>    
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}