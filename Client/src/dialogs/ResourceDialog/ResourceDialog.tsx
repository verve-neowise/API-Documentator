import { useRef } from "react"
import { BaseDialog, Button, Input  } from "../../components"
import { useResourceDialog } from "./Context"

export default () => {

    const { state, changeVisiblity, updateResource } = useResourceDialog()

    const nameRef = useRef<HTMLInputElement>(null)

    const confirm = () => {

        if (state.target) {

            updateResource({
                ...state.target,
                name: nameRef.current?.value ?? ""
            })

            changeVisiblity(false)
        }
    }

    return (
        <BaseDialog show={state.show} title="Rename resource">
            <Input className="w-full" ref={nameRef} value={state.target?.name ?? ''} />

            <hr className="my-3" />
            <div className="flex justify-end gap-3">
                <Button size="sm" onClick={confirm}> Save </Button>
                <Button size="sm" variant="secondary" onClick={() => changeVisiblity(false)}> Cancel </Button>
            </div>
        </BaseDialog>
    )
}