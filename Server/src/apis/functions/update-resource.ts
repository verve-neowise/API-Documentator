import { UpdateResourceDto } from "@apis/models/api"
import { findApiByUid, getOwnshipByUid } from "@apis/services/api.service"
import { updateSchemaFile } from "@apis/services/files.service"
import { Request, Response } from "express"

export default async (req: Request, res: Response) => {
    try {
        const user = res.locals.user

        const ownship = await getOwnshipByUid(user.id, req.params.id)

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

        const api = await findApiByUid(req.params.id)
        const updateDto: UpdateResourceDto = req.body

        if (!api) {
            return res.status(404).json({
                message: 'Api not found'
            })
        }

        updateSchemaFile(api.file, JSON.stringify(updateDto.resources))

        res.json({
            message: 'Update api',
            api: {
                id: api.id,
                uid: api.uid,
                userId: api.userId,
                name: api.name,
                visibility: api.visibility,
                description: api.description,
                schema: api.file,
            },
            resources: updateDto.resources
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}