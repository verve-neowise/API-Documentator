import { getOwnshipByUid } from "@apis/services/api.service";
import { User } from "@prisma/client";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    try {
        const user: User = res.locals.user
        const uid: string = req.params.id
    
        const ownship = await getOwnshipByUid(user.id, uid)
    
        if (ownship == null) {
            return res.status(404).json({
                message: 'Api not found'
            })
        }
    
        res.status(200).json({
            message: 'api ownship',
            ownship
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}