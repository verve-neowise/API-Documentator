import { Breadcrumb } from "../../models/Breadcrumb"

type Props = {
    breadcrumb: Breadcrumb,
    enableDivider: boolean,
    disabled: boolean,
    onSelect: (breadcrumb: Breadcrumb) => void,
}

export default ({ breadcrumb, enableDivider, disabled, onSelect } : Props) => {


    const enabledClasses = `
    text-md text-slate-500 p-1
    hover:bg-slate-100 rounded
    cursor-pointer`

    const disabledClasses = `text-md text-slate-400 p-1 rounded`

    return (
        <>
        { enableDivider && < span className="text-md text-slate-400 py-1"> /</span> }
            <span
                className={ disabled ? disabledClasses : enabledClasses }
                onClick={() => onSelect(breadcrumb)}> 
                {breadcrumb.title} 
            </span>
        </>
    )
}