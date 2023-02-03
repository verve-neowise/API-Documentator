import NavbarItem from "./NavbarItem"
import Profile from "./Profile"

export default () => {
    return (
        <header className="p-3 shadow-sm bg-white sticky top-0">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-chakra font-bold"> API Documentator </h1>

                <ul className="flex gap-3">
                    <NavbarItem name="My APIs" link="/apis"/>
                    <NavbarItem name="Community" link="/community"/>
                </ul>
                <Profile />
            </div>
        </header>
    )
}