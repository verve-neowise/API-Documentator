import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ChildrenProps } from "../../models/Props"

type Props = {
    title: string,
    image?: string,
    link?: string
} & ChildrenProps

export default ({ title, image, link } : Props) => {

    const navigate = useNavigate()

    return (
        <div className="flex justify-start">
            <h4 onClick={() => link ? navigate(link) : null } className="text-xl text-slate-600 flex gap-3 items-center rounded-md cursor-pointer hover:bg-slate-100 active:bg-slate-200 px-3 py-2 active:scale-95 transition-all duration-75"> 
                <ArrowLeft size="16"/>
                <div className="flex items-baseline gap-2 text-sm">
                    { image &&  <img src={image} className="w-5 h-5 object-cover"/> }
                    {title}
                </div>
            </h4> 
        </div>
    )
}