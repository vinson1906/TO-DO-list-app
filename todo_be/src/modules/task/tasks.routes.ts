import express from 'express';
import * as TaskControlllers from './controller/task.controller';
import { authMiddelware } from '../../middleware/authMiddelware'

const TaskRoutes = express.Router();

TaskRoutes.get('/get', TaskControlllers.getTaskController);
TaskRoutes.post('/create', TaskControlllers.createTaskController);
TaskRoutes.put('/update/:id', TaskControlllers.updateTaskController);
TaskRoutes.delete("/delete/:id", TaskControlllers.deleteTaskController);
TaskRoutes.get('/get/:id',TaskControlllers.getSingleTaskController);

export default TaskRoutes;