import { forwardRef, Ref, useEffect, useState } from "react"

type Props = {
    placeholder?: string
    value?: string
    disabled?: boolean
    className?: string
    ref?: Ref<HTMLInputElement>
}

export default forwardRef(({ className = "", placeholder = '', value, disabled = false }: Props, ref: Ref<HTMLTextAreaElement>) => {
    return (
        <textarea 
            ref={ref} 
            className={`${className} p-2 border border-slate-100 rounded flex gap-2 items-center focus:border-blue-300 bg-none outline-none`} 
            placeholder={placeholder}
            defaultValue={value}
            readOnly={disabled}
            disabled={disabled}>
        </textarea>
    )
})