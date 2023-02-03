import { UpdateApiDto } from "@apis/models/api"
import { findApiByUid, getOwnshipByUid, updateApiByUid } from "@apis/services/api.service"
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
        const updateDto: UpdateApiDto = req.body

        if (!api) {
            return res.status(404).json({
                message: 'Api not found'
            })
        }

        const updatedApi = await updateApiByUid(req.params.id, updateDto)

        res.json({
            message: 'Update api',
            api: {
                id: updatedApi.id,
                uid: updatedApi.uid,
                userId: updatedApi.userId,
                name: updatedApi.name,
                visibility: api.visibility,
                description: updatedApi.description,
                schema: updatedApi.file,
            },
        })

    }
    catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}