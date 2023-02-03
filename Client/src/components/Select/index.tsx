import { forwardRef, Ref, useState } from "react"
import { ChildrenProps } from "../../models/Props"

type Props = {
    placeholder?: string
    disabled?: boolean
    className?: string
    ref?: Ref<HTMLInputElement>
    value?: string
    onChange?: (value: string) => void
} & ChildrenProps

export default forwardRef(({ className = '', placeholder = '', disabled = false, children, onChange }: Props, ref: Ref<HTMLSelectElement>) => {

    const setChanges = (value: string) => {
        onChange && onChange(value)
    }

    return (
        <select
            ref={ref} 
            className={`${className} p-2 border border-slate-100 rounded flex gap-2 items-center focus:border-blue-300 bg-none outline-none`} 
            placeholder={placeholder}
            onChange={ (event) => { setChanges(event.target.value) } }
            disabled={disabled}>
            {children}
        </select>
    )
})