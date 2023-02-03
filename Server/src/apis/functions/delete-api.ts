import { User } from "@prisma/client"
import { deleteApi, getOwnshipById } from "@apis/services/api.service"
import { deleteSchemaFile } from "@apis/services/files.service"
import { Request, Response } from "express"

export default async (req: Request, res: Response) => {
    try {
        const user: User = res.locals.user

        const ownship = await getOwnshipById(user.id, +req.params.id)

        if (ownship == null) {
            return res.status(404).json({
                message: 'Cannot find api'
            })
        }

        if (!ownship) {
            return res.status(403).json({
                message: 'Access denied'
            })
        }

        const api = await deleteApi(user.id, +req.params.id)

        if (!api) {
            return res.status(403).json({
                message: 'Cannot delete api'
            })
        }

        deleteSchemaFile(api.file)

        res.json({
            message: 'Api deleted',
            api: {
                id: api.id,
                uid: api.uid,
                userId: api.userId,
                name: api.name,
                visibility: api.visibility,
                description: api.description,
                schema: api.file
            }
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}