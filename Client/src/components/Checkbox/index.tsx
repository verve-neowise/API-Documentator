import { Check } from "lucide-react"
import { forwardRef, Ref, useEffect, useLayoutEffect, useState } from "react"

type Props = {
    defaultValue?: boolean
    className: string
    onChange: (value: boolean) => void 
}

export default ({ className, defaultValue, onChange }: Props) => {

    const [checked, setChecked] = useState<boolean>(false)

    useLayoutEffect(() => setChecked(defaultValue ? defaultValue : false), [])

    return (
        <div
            onClick={() => { setChecked(state => !state); onChange(checked)}}
            className={`${className} p-2 w-9 h-8 border border-slate-100 rounded flex justify-center items-center focus:border-blue-300 bg-none outline-none active:scale-95`} 
        >
            {
                checked && (
                    <Check size="14"/>
                )
            }
        </div>
    )
}