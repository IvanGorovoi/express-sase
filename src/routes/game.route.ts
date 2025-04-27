import { Router } from "express";
import { GameService } from "../services/game.service";
import { sendError } from "../utils";

export const GameRoute = Router()

GameRoute.get('/', async (req, res) => {
    try {
        res.json(await GameService.getGames())
    } catch (e) {
        sendError(res, e)
    }
})

GameRoute.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        res.json(await GameService.getGameById(id))
    } catch (e) {
        sendError(res, e)
    }
})

GameRoute.post('/', async (req, res) => {
    try {
        await GameService.createGame(req.body)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

GameRoute.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        await GameService.updateGame(id, req.body)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

GameRoute.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        await GameService.deleteGame(id)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

