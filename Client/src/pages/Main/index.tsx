import { Outlet } from "react-router-dom";
import { BreadcrumbProvider } from "../../components/Breadcrumb/BreadcrumbContext";
import { Navbar } from "../../components";

export default () => {
    return (
        <BreadcrumbProvider>
            <div className="min-h-screen flex flex-col">
                <Navbar/>
                <div className="min-h-full mt-3 grow flex flex-col container mx-auto">
                    <Outlet/>
                </div>
            </div>
        </BreadcrumbProvider>
    )
}