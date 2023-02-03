import { Api, User } from "@prisma/client"
import { findAllUserApis, findPublicApis } from "@apis/services/api.service"
import { Request, Response } from "express"

export default async (req: Request, res: Response) => {
    try {
        const apis: Api[] = await findPublicApis()

        res.json({
            message: 'Community apis',
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