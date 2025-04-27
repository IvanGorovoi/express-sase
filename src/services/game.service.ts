import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Game } from "../entities/Game";

const repo = AppDataSource.getRepository(Game)

export class GameService{ 
    static async getGames(){
        return await repo.find({
            select: {
                name : true,
                website: true,
                gameId: true,
                createdAt: true,
                updatedAt: true
            },
            where:{
                deletedAt: IsNull()
            }
        })
    }

    static async getGameById(id: number) {
        const data = await repo.findOne({
            where: {
                gameId: id,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error('NOT_FOUND')

        return data
    } 
    static async createGame(model: Game) {
        await repo.save({
            name: model.name,
            website: model.website,
            createdAt: new Date()
        })
    }
   
    static async updateGame(id: number, model: Game) {
        const data = await this.getGameById(id)
        data.name = model.name
        data.website = model.website
        data.updatedAt = new Date()
        await repo.save(data)
    }
 
    static async deleteGame(id: number) {
        const data = await this.getGameById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}