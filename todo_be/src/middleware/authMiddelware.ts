import { prisma } from '../lib/prisma'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddelware = (req: Request, res: Response, next: NextFunction) => {
console.log("auth middle ware running...");

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if (!token) {
        return res.status(500).json({
            message: "unauthorize user or user not found"
        })
    }

    //jwt verify

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRECT);
        const user = prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })

        if (!user) {
            return res.json({
                message: "user no longer exists...!"
            })
        }
// 
        next()
    }
    catch (err) {
        return res.status(500).json({
            message: "unauthorize user"
        })
    }
}