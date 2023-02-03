import { LoginDto } from "@auth/models/auth";
import { findUserByEmail } from "@auth/services/user.service";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    try {
        const loginDto: LoginDto = req.body

        const user = await findUserByEmail(loginDto.email)

        if (user == null) {
            return res.status(404).json({
                message: 'User with email ' + loginDto.email + ' not found'
            })
        }

        if (user.password != loginDto.password) {
            return res.status(400).json({
                message: "Email or password wrong"
            })
        }

        res.status(200).json({
            message: "Successfuly login",
            user: {
                id: user.id,
                email: user.email,
            },
            token: user.token
        })

    }
    catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}