import { Router } from "express";
import { UserService } from "../services/user.service";

export const UserRoute = Router()

UserRoute.get('/', async (req, res) => {
    res.json(await UserService.getUsers())
})
