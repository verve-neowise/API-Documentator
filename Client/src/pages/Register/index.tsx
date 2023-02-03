import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { Auth } from "../../models/Auth"
import { registerApi, RegisterDto } from "../../network/apis/auth"
import { ErrorType, usePost } from "../../network/queries/baseQuery"
import { storeAuth } from "../../storage/authStorage"

export default () => {
    
    const navigate = useNavigate()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const { isLoading, mutate } = usePost(registerApi, {
        onResponse(data: Auth, status: number) {
            console.log(data);
            storeAuth(data)
            navigate('/')
        },
        onError(error: ErrorType, status: number) {
            alert(`${error.message}`)
        }
    })

    const onRegister = () => {
        const body: RegisterDto = {
            email: emailRef.current?.value ?? "",
            password: passwordRef.current?.value ?? "",
        }

        mutate(body)
    }

     return (
        <div className="container mx-auto h-screen flex flex-col gap-3 justify-center items-center">
            <h1 className="text-3xl font-chakra font-bold mb-3"> API Documentator </h1>

            <Input ref={emailRef} placeholder="Email"/>
            <Input ref={passwordRef} placeholder="Password"/>

            <Button loading={isLoading} onClick={onRegister}> Register </Button>
            <Link to='/login' className="text-md text-blue-400"> Login </Link>
        </div>
    )
}