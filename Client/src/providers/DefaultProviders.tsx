import { ApisProvider } from "../context/ApisContext";
import { ResourcesProvider } from "../context/ResourcesContext";
import { RoutesProvider } from "../context/RoutesContext";
import { ChildrenProps } from "../models/Props";

export default ({ children } : ChildrenProps) => {
    return (
        <ApisProvider>
            <ResourcesProvider>
                <RoutesProvider>
                    {children}
                </RoutesProvider>
            </ResourcesProvider>
        </ApisProvider>
    )
}