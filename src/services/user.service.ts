import { AppDataSource } from "../db";
import { User } from "../entities/User";

const repo = AppDataSource.getRepository(User)

export class UserService{ 
    static async getUsers(){
        return await repo.find({
            select: {
                userId : true,
                email: true,
                name: true
            },
            
        })
    }
}