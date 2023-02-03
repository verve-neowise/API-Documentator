import client from "@shared/database";
import { RegisterDto } from "@auth/models/auth";
import { SECRET_KEY } from "@shared/config";
import md5 from "md5";

export const createUser = async (user: RegisterDto) => {
    return client.user.create({
        data: {
            email: user.email,
            password: user.password,
            token: md5(user.email + "." + user.password + ":" + SECRET_KEY)
        }
    })
}

export const findUserByEmail = async (email: string) => {
    return client.user.findUnique({
        where: {
            email
        }
    })
}

export const findUserByToken = async (token: string) => {
    return client.user.findFirst({
        where: {
            token
        }
    })
}

export const isUserExists = async (email: string) => {
    const user = await client.user.findUnique({
        where: {
            email
        }
    })

    return user != null
}