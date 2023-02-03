import { useContext } from "react"
import { BreadcrumbContext } from "./BreadcrumbContext"
import BreadcrumbItem from "./BreadcrumbItem"

export default () => {

    const { breadcrumbs, navigate } = useContext(BreadcrumbContext)

    const isFirst = (index: number) => {
        return index == 0
    }

    const isLast = (index: number) => {
        return index == breadcrumbs.length - 1
    }

    return (
        <div className="bg-slate-50/50">
            <div className="container mx-auto px-3 py-2 flex gap-1">
                {
                    breadcrumbs.map((breadcrumb, index) => (
                        <BreadcrumbItem
                            breadcrumb={breadcrumb}
                            enableDivider={ !isFirst(index) }
                            disabled={ isLast(index) }
                            onSelect = { (breadcrumb) => navigate(breadcrumb.path) }
                            />
                    ))
                }
            </div>
        </div>
    )
}