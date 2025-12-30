import express from 'express'
import * as UserController from './controller/user.controller'

const UserRouter = express.Router()

UserRouter.post("/auth/register",UserController.register);
UserRouter.post("/auth/login",UserController.LoginUser);
UserRouter.post("/auth/logout",UserController.logout);
UserRouter.delete("/user/delete/:id",UserController.deleteUser);
UserRouter.get("/auth/admin/get",UserController.getUsers);



export default UserRouter;