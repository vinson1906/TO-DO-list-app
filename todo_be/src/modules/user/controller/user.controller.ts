
import { Request, Response } from 'express'
import * as userServices from '../service/user.service'
import bcrypt from 'bcrypt'
import { generateToken } from '../../utils/utils'


export const register = async (req: Request, res: Response) => {
    try {

        const { password, email } = req.body


        const isUserExists = await userServices.getuserbyEmail(email);

        if (isUserExists) {
            return res.status(500).json({
                message: `user already exists in this ${email} email`
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const response = await userServices.registerUser({

            ...req.body,
            password: hashedPassword
        });

        const token = await generateToken(isUserExists.id, res)

        return res.status(201).json({
            message: "user created successfully",
            data: response,
            token: token
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

export const LoginUser = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const user = await userServices.getuserbyEmail(email);

        if (!user) {
            return res.status(500).json({
                message: "Invalid user "
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);


        if (!isValidPassword) {
            return res.status(500).json({
                message: "Invalid  password"
            })
        }

        const token = await generateToken(user.id, res)

        res.status(200).json({
            message: "logined successfully",
            token: token
        })
    }
    catch (err) {
        res.status(500).json({
            message: "error form login"
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {

        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return res.status(200).json({
            message: "user logout successfully"
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "something went wrong while logout user"
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await userServices.getuserbyId(req.params.id)

        if (!user) {
            return res.status(500).json({
                message: "user doesn't exists"
            })
        }

        await userServices.deleteUser(req.params.id)

        res.status(202).json({
            "success": true,
            message: "user deleted successfully"
        })

    }
    catch (err) {
        return res.status(400).json({
            message: "something went wrong while deleting the user"
        })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        console.log("running...");
        
        const user = await userServices.getUserService()
        return res.status(200).json({
            user: user
        })
    }
    catch (err) {
        return res.status(400).json({
            message: "something went wrong while read the user"
        })
    }
}