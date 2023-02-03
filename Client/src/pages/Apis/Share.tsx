import { Copy } from "lucide-react"
import BaseDialog from "../../components/BaseDialog"
import Button from "../../components/Button"
import Input from "../../components/Input"

type Props = {
    show: boolean,
    url: string,
    onClose: () => void
}

export default ({ show, url, onClose } : Props) => {

    return (
        <BaseDialog title="Share" show={show}>
            <div className="flex flex-col gap-3">

                <div className="flex gap-3">
                    <Input value={url} placeholder="Url" className="grow text-xs" disabled={true}/>
                    <Button size="sm" icon={<Copy size="14"/>}> </Button>
                </div>

                <div className="flex gap-3 justify-end">
                    <Button size="sm" variant="secondary" onClick={onClose}> Cancel </Button>
                </div>
            </div>
        </BaseDialog>
    )
}