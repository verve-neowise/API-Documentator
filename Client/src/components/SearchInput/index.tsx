import { Search } from "lucide-react"
import { useRef } from "react"

type Props = {
    placeholder: string,
    onSearch: (criteria: string) => void
}

export default ({ placeholder, onSearch } : Props) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const search = () => {
        let value = inputRef.current?.value
        if (value) {
            onSearch(value)
        }
    }

    return (
        <div className="p-2 border border-slate-100 rounded flex gap-2 items-center">
            <input ref={inputRef} type="text" className="bg-none outline-none" placeholder={placeholder}/>
            <div onClick={search} className="flex p-2 hover:bg-slate-100 rounded active:bg-slate-200 text-slate-500 transition-all duration-75">
                <Search size={16}/>
            </div>
        </div>
    )
}