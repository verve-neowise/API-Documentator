import { findApiByUid } from "@apis/services/api.service"
import { readSchemaFile } from "@apis/services/files.service"
import { User } from "@prisma/client"
import { Request, Response } from "express"

export default async (req: Request, res: Response) => {
    try {
        const user: User = res.locals.user

        const api = await findApiByUid(req.params.id)

        if (!api) {
            return res.status(404).json({
                message: 'Api not found'
            })
        }

        const content = readSchemaFile(api.file)

        res.json({
            message: 'Retrive api',
            api: {
                id: api.id,
                uid: api.uid,
                userId: api.userId,
                name: api.name,
                visibility: api.visibility,
                description: api.description,
                schema: api.file,
            },
            ownship: api.userId == user.id,
            resources: JSON.parse(content.length == 0 ? "[]" : content)
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}