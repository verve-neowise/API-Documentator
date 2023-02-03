import { ChildrenProps } from "../../models/Props"

type Props = {
    show: boolean,
    title: string,
    isWide?: boolean
} & ChildrenProps

export default ({ show, title, children, isWide } : Props) => {
    return (
        <div className={ 'fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center ' + (show ? 'block' : 'hidden') }>
            <div className={`${isWide ? "w-[600px]" : ""} bg-white p-5 rounded-lg min-w-[400px] max-w-[600px]`}>
                <h3 className="text-lg font-semibold"> {title} </h3>
                <hr className="my-3"/>
                {children}
            </div>
        </div>
    )
}