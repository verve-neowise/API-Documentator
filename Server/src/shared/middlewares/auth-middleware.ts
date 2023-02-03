import { findUserByToken } from "@auth/services/user.service";
import { NextFunction, Request, Response } from "express";

export default () => async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({
            message: 'Token not provided'
        })
    }

    const user = await findUserByToken(token)

    if (!user) {
        return res.status(403).json({
            message: 'Invalid token'
        })
    }

    res.locals.user = user

    next()
}