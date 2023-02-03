import { Api, User } from "@prisma/client"
import { findAllUserApis } from "@apis/services/api.service"
import { Request, Response } from "express"

export default async (req: Request, res: Response) => {

    try {
        const user: User = res.locals.user
        const apis: Api[] = await findAllUserApis(user.id)

        res.json({
            message: 'All user apis',
            apis: apis.map(api => {
                return {
                    id: api.id,
                    uid: api.uid,
                    userId: api.userId,
                    name: api.name,
                    visibility: api.visibility,
                    description: api.description,
                    schema: api.file
                }
            })
        })

    }
    catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}