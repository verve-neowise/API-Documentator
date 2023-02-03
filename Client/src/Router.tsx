import { createBrowserRouter, Navigate } from "react-router-dom"
import Main from "./pages/Main"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AuthProtector from "./components/AuthProtector"
import Apis from "./pages/Apis"
import Resources from "./pages/Resources"
import DefaultProviders from "./providers/DefaultProviders"
import DialogProviders from "./providers/DialogProviders"
import Community from "./pages/Community"

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: (
            <DefaultProviders>
                <DialogProviders>
                    <AuthProtector element={<Main />} />,
                </DialogProviders>
            </DefaultProviders>
        ),
        children: [
            {
                index: true,
                element: <Navigate to='/apis' replace />
            },
            {
                path: '/apis',
                children: [
                    {
                        index: true,
                        element: (
                            <Apis />
                        )
                    },
                    {
                        path: ':id',
                        element: (
                            <Resources backPath="/apis" />
                        )
                    }
                ]
            },
            {
                path: '/community',
                children: [
                    {
                        index: true,
                        element: (
                            <Community />
                        )
                    },
                    {
                        path: ':id',
                        element: (
                            <Resources backPath="/community"/>
                        )
                    }
                ]
            }
        ]
    }
])

export default router