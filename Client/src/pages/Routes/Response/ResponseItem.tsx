import { Response, Status } from "../../../models/Api";

type Props = {
    isActive: boolean
    response: Response
    onClick?: (response: Response) => void
}

const statusColors: { [key in Status]: string } = {
    warning: 'text-orange-400',
    error: 'text-red-400',
    neutral: 'text-slate-400',
    success: 'text-green-400'
}

export default ({ isActive, response, onClick } : Props) => {

    const activeClass = isActive ? 'bg-blue-50/50' : ''
    return (
        <div 
            onClick={() => onClick && onClick(response)} 
            className={`${activeClass} ${statusColors[response.status]} p-1 px-2
                active:scale-x-[0.99] active:scale-y-[0.95]
                text-slate-400 rounded-md
                cursor-pointer select-none`}>
            {response.code}
        </div>
    )
}