import jwt from 'jsonwebtoken';

interface Payload {
    id: string
}

export const generateToken = (userId: string, res:any) => {
    const payload: Payload = {
        id: userId
    }

    const token = jwt.sign(payload, process.env.JWT_SECRECT, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        secuire: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: (1000 * 60 * 60 * 24) * 7
    })

    return token
}