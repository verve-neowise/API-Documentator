import { Request, Response } from "express";

import { User } from "@auth/models/user";
import { RegisterDto } from "@auth/models/auth";
import { createUser, isUserExists } from "@auth/services/user.service";

export default async (req: Request, res: Response) => {
    try {
        const data: RegisterDto = req.body

        const isExists: boolean = await isUserExists(data.email)
    
        if (isExists) {
            return res.status(403).json({
                message: 'Email already busy'
            })
        }
   
        const user: User = await createUser(data)

        res.status(200).json({
            message: "Successfuly register",
            user: {
                id: user.id,
                email: user.email,
            },
            token: user.token
        })
    }
    catch(err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}