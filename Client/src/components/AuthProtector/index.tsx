import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "../../storage/authStorage"

type Props = {
    element?: JSX.Element
}

export default ({ element } : Props) => {
    const user = getUser()

    if (!user) {
        return <Navigate to="/login"/>
    }

    return element ?? <Outlet/>
}