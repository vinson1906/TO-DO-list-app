import { Request, Response } from 'express';
import * as taskServices from '../service/task.service';



export const createTaskController = async (req: Request, res: Response) => {

    try {
        const result: any = await taskServices.createTaskService(req.body);
        if (!result) {
            return res.status(400).json({
                error: "error while creating task"
            })
        }

        return res.status(201).json({
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            error: err,
        })
    }

}

export const getTaskController = async (req: Request, res: Response) => {

    try {
        const result = await taskServices.getTaskService();
        res.status(201).json({
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            error: err,
        })
    }

}

export const updateTaskController = async (req: Request, res: Response) => {

    try {
        const result = await taskServices.updateTaskService(req.params.id, req.body);
        res.status(201).json({
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            error: err,
        })
    }

}

export const deleteTaskController = async (req: Request, res: Response) => {

    try {
        const result: any = await taskServices.deleteTaskService(req.params.id);
        if (!result) {
            res.status(400).json({
                error: "error while deleting task"
            })
        }

        res.status(201).json({
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            error: err,
        })
    }

}

export const getSingleTaskController = async (req: Request, res: Response) => {
    try {


        const { id } = req.params;
        console.log(id);
        if (!id) {
            return res.status(500).json({
                message: "user id needed "
            })
        }

        const result = await taskServices.getSingleTaskService(id)
        console.log("single data:", result);

        res.status(200).json({
            data: result,
            status: "success"
        })
    }
    catch (err) {

    }
}