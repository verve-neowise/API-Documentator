import { ApiDialogProvider } from "../dialogs/ApiDialog";
import { ResourceDialogProvider } from "../dialogs/ResourceDialog";
import { ResponseDialogProvider } from "../dialogs/ResponseDialog";
import { RouteDialogProvider } from "../dialogs/RouteDialog";
import { ChildrenProps } from "../models/Props";

export default ({ children }: ChildrenProps) => {
    return (
        <ResourceDialogProvider>
            <ApiDialogProvider>
                <RouteDialogProvider>
                    <ResponseDialogProvider>
                        {children}
                    </ResponseDialogProvider>
                </RouteDialogProvider>
            </ApiDialogProvider>
        </ResourceDialogProvider>
    )
}