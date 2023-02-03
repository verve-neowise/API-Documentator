import Button from "../../components/Button"
import Input from "../../components/Input"

import { Ref, useRef } from "react"
import { loginApi, LoginDto } from "../../network/apis/auth"
import { Link, useNavigate } from "react-router-dom"
import { ErrorType, usePost } from "../../network/queries/baseQuery"
import { storeAuth } from "../../storage/authStorage"
import { Auth } from "../../models/Auth"

export default () => {
    
    const navigate = useNavigate()

    const { isLoading, mutate } = usePost((dto: LoginDto) => loginApi(dto), {
        onResponse(data: Auth, status: number) {
            console.log(data);
            storeAuth(data)
            navigate('/')
        },
        onError(data: ErrorType, status: number) {
            alert(`${data.message}`)
        }
    })

    const emailRef: Ref<HTMLInputElement> = useRef(null) 
    const passwordRef: Ref<HTMLInputElement> = useRef(null) 

    const onLogin = () => {
        const email = emailRef.current?.value ?? ''
        const password = passwordRef.current?.value ?? ''

        mutate({ email, password })
    }

    return (
        <div className="container mx-auto h-screen flex flex-col gap-3 justify-center items-center">
            <h1 className="text-3xl font-chakra font-bold mb-3"> API Documentator </h1>

            <Input ref={emailRef} placeholder="Email"/>
            <Input ref={passwordRef} placeholder="Password"/>

            <Button loading={isLoading} onClick={onLogin}> Login </Button>
            <Link to='/register' className="text-md text-blue-400"> Register </Link>
        </div>
    )
}