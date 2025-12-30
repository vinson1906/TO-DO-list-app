
import { prisma } from '../../../lib/prisma'

export const createTaskService = async (data: any) => {
    const res = await prisma.tasks.create({
        data: data
    })

    return res
}

export const getTaskService = async () => {
    const res = await prisma.tasks.findMany()
    console.log(res);

    return res
}

export const updateTaskService = async (id: string, data: any) => {

    const res = await prisma.tasks.update({
        where: {
            id: id
        },
        data: data
    })

    return res
}

export const deleteTaskService = async (id: string) => {
    const res = await prisma.tasks.delete({
        where: {
            id: id
        }
    })
    return res
}

export const getSingleTaskService = async (id: string) => {
    const res = await prisma.tasks.findUnique({
        where: {
            id: id
        }
    })

    return res
}