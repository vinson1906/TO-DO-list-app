import { prisma } from '../../../lib/prisma'


export const registerUser = async (data: any) => {
    const res = await prisma.user.create({
        data: data
    })

    return res
}

export const getuserbyEmail = async (email: string) => {
    const res = await prisma.user.findUnique({
        where: { email: email }
    })

    return res
}

export const getuserbyId = async (id: string) => {
    const res = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return res
}

export const deleteUser = async (id: string) => {
    const res = await prisma.user.delete({
        where: {
            id: id
        }
    })

    return res
}

export const getUserService = async () => {
    const user = await prisma.user.findMany()

    return user
}