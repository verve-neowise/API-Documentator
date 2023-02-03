import { useLayoutEffect, useRef, useState } from "react"
import BaseDialog from "../../components/BaseDialog"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Select from "../../components/Select"
import { Method, Protection, Route } from "../../models/Api"
import { useRouteDialog } from "./Context"
import { v4 as uuid } from 'uuid'

export default () => {

    const { state, changeVisiblity, updateRoute, createRoute } = useRouteDialog()

    const [protection, setProtected] = useState<Protection>(state.target?.protection ?? 'public')

    const methodRef = useRef<HTMLSelectElement>(null)
    const pathRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const accessRef = useRef<HTMLInputElement>(null)
    const protectionRef = useRef<HTMLSelectElement>(null)

    useLayoutEffect(() => {
        if (state.target) {
            methodRef.current!.value = state.target.method
            protectionRef.current!.value = state.target.protection
            setProtected(state.target.protection)
        }
    }, [])

    const confirm = () => {

        const access = protection == 'role' ? accessRef.current!.value.split(':')
            .map(v => v.trim())
            .filter(v => v.length > 0) : undefined

        const data: Route = {
            id: state.target ? state.target.id : uuid(),
            method: methodRef.current?.value as Method ?? 'GET',
            path: pathRef.current?.value ?? '/',
            about: descriptionRef.current?.value ?? '',
            responses: [],
            protection: protection,
            access
        }

        if (state.target) {
            updateRoute(state.resourceId!, data)
        }
        else {
            createRoute(state.resourceId!, data)
        }

        changeVisiblity(false, '')
    }

    return (
        <BaseDialog show={state.show} title={state.target ? 'Edit route' : 'Create route'}>
            <div className="grid grid-cols-4 gap-3 text-sm">
                <Select ref={methodRef} value={ state.target ? state.target.method : 'GET' } className="" placeholder="Method">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                </Select>
                <Input ref={pathRef} value={state.target?.path} className="col-span-3" placeholder="Path"/>
                <Input ref={descriptionRef} value={state.target?.about} className="col-span-4" placeholder="Description"/>
                <Select ref={protectionRef} placeholder="Access" onChange={ (value) => setProtected(value as typeof protection) }>
                    <option value="public">Public</option>
                    <option value="protected">Protected</option>
                    <option value="role">Require Role</option>
                </Select>
                <Input 
                    ref={accessRef} 
                    value={protection == 'role' ? state.target?.access?.join(':') : '' } 
                    className="col-span-3" placeholder="Access" 
                    disabled={protection != 'role'}/>
            </div>
            <hr className="my-3"/>
            <div className="flex justify-end gap-3">
                <Button size="sm" onClick={confirm}> Save </Button>
                <Button size="sm" variant="secondary" onClick={() => changeVisiblity(false, '')}> Cancel </Button>
            </div>
        </BaseDialog>
    )
}