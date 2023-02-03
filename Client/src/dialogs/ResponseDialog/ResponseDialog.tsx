import BaseDialog from "../../components/BaseDialog"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { Response, Status } from "../../models/Api"
import { v4 as uuid } from 'uuid'
import { useLayoutEffect, useRef, useState } from "react"
import { useResponseDialog } from "./Context"
import CodeEditor from "../../components/CodeEditor"
import Editor from "react-simple-code-editor"
import Select from "../../components/Select"

export default () => {

    const { state, updateResponse, createResponse, changeVisiblity } = useResponseDialog()

    const [code, setCode] = useState<string>(state.target?.body ?? "")
    console.log(state)
    const codeRef = useRef<HTMLInputElement>(null)
    const statusRef = useRef<HTMLSelectElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<Editor>(null)

    useLayoutEffect(() => {
        if (state.target) {
            statusRef.current!.value = state.target.status
        }
    }, [])

    const confirm = () => {
        const data: Response = {
            id: state.target ? state.target.id : uuid(),
            code: codeRef.current?.value ?? '',
            description: descriptionRef.current?.value ?? '',
            body: code,
            status: statusRef.current?.value as Status ?? 'neutral',
            type: 'response'
        }

        if (state.target) {
            updateResponse(state.resourceId!, state.routeId!, data)
        }
        else {
            createResponse(state.resourceId!, state.routeId!, data)
        }

        changeVisiblity(false)
    }

    return (
        <BaseDialog isWide title={ state.target ? 'Edit response' : 'Create response'} show={state.show}>
            <div className="flex flex-col gap-2 text-sm">
                <div className="flex gap-2">
                    <Input className="grow" ref={codeRef} value={ state.target?.code } placeholder="Code"/>
                    <Select className="grow" ref={statusRef} value={ state.target?.status } placeholder="Status">
                        <option value="success"> Success </option>
                        <option value="neutral"> Neutral </option>
                        <option value="warning"> Warning </option>
                        <option value="error"> Error </option>
                    </Select>
                </div>
                <Input ref={descriptionRef} value={state.target?.description} placeholder="Description"/>
                <CodeEditor value={code} ref={bodyRef} onChange={setCode}/>
            </div>

            <hr className="my-3"/>

            <div className="flex justify-end gap-3">
                <Button size="sm" onClick={confirm}> Save </Button>
                <Button size="sm" variant="secondary" onClick={ () => changeVisiblity(false) }> Cancel </Button>
            </div>
        </BaseDialog>
    )
}