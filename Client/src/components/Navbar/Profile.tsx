import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { getUser, removeAuth } from "../../storage"
import Button from "../Button"

export default () => {

    const navigate = useNavigate()

    const user = getUser()

    const logout = () => {
        removeAuth()
        navigate('/login')
    }

    return (
        <div className="flex gap-2 items-center">
            <div className="flex gap-3 items-center sm:hidden md:flex lg:flex">
                <span className="leading-5"> {user?.email} </span> 
                <Button variant="secondary" onClick={logout} size="sm" icon={<LogOut size={14}/>}> Logout </Button>
            </div>
        </div>
    )
}