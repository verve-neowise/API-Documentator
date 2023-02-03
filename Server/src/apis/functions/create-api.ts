import { User } from "@prisma/client"
import { ApiDto } from "apis/models/api"
import { createApi } from "@apis/services/api.service"
import { createSchemaFile, createUserFolder } from "@apis/services/files.service"
import { Request, Response } from "express"
import { v4 as uuid } from "uuid"

export default async (req: Request, res: Response) => {
    try {
    const dto: ApiDto = req.body

    const user: User = res.locals.user

    const userFolder = user.email

    createUserFolder(userFolder)

    const filename = createSchemaFile(userFolder, uuid())

    const api = await createApi(user.id, dto, filename) 

    res.json({
        message: 'Api created',
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