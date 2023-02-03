import { useRef } from "react"
import BaseDialog from "../../components/BaseDialog"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Select from "../../components/Select"
import { useApiDialog } from "./context"

export default () => {

    const { state, changeVisiblity, createApi, updateApi } = useApiDialog()

    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const visibilityRef = useRef<HTMLSelectElement>(null)

    const create = () => {
        const name = nameRef.current?.value ?? ""
        const description = descriptionRef.current?.value ?? ""
        const visibility = visibilityRef.current?.value ?? ""

        if (state.target) {
            updateApi(state.target.uid, name, description, visibility)
        }
        else {
            createApi(name, description, visibility)
        }
    }

    return (
        <BaseDialog title={state.target ? "Edit API" : "Create API"} show={state.show}>
            <div className="flex flex-col gap-3">
                <Input value={state.target?.name ?? ""} ref={nameRef} placeholder="Name"/>
                <Input value={state.target?.description ?? ""} ref={descriptionRef} placeholder="Description"/>
                <Select value={state.target?.visibility ?? "private"} ref={visibilityRef} placeholder="Visibility">
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </Select>

                <div className="flex gap-3 justify-end">
                    <Button onClick={create}> Create </Button>
                    <Button variant="secondary" onClick={ () => changeVisiblity(false)}> Cancel </Button>
                </div>
            </div>
        </BaseDialog>
    )
}