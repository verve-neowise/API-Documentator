import { MouseEventHandler, ReactNode, useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { BreadcrumbContext } from "../Breadcrumb/BreadcrumbContext"

type Props = {
    icon?: ReactNode,
    name: string,
    link: string
}

export default ( { icon, name, link } : Props ) => {

    const { root } = useContext(BreadcrumbContext)

    const classes = "px-5 py-1 hover:bg-slate-100 rounded-md flex items-center gap-3 transition-all active:scale-95"
    const activeClasses = ' bg-slate-200 hover:bg-slate-200'

    const onNavigate = (event: any) => {
        event.preventDefault()
        root(name, link)
    }

    return (
        <li>
             <NavLink to={link} onClick={onNavigate} className={ ({ isActive }) => classes + (isActive ? activeClasses : '')}> 
                { icon ? icon : null }
                <span className="sm:hidden md:inline">{name}</span> 
             </NavLink>
        </li>
    )
}