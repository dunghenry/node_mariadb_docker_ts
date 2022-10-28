import User from '../models/user.model';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/User';
import { pool } from '../configs/connect.db';
import { checkEmail, createUser, getUser, getUsers } from '../queries/user';
class userController {
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await pool.query(getUsers);
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    static async createUser(req: Request, res: Response) {
        const { username, email, age }: IUser = req.body;
        try {
            const user = await pool.query(checkEmail, [email]);
            if (user.length) {
                return res.status(400).json('Email already exists.');
            }
            const newUser: IUser = new User(username, email, age);
            const dt = await pool.query(createUser, [
                newUser.username,
                newUser.email,
                newUser.age,
            ]);
            return res.status(201).json('Created user successfully.');
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async getUser(req: Request, res: Response) {
        const id: number = +req.params.id;
        try {
            const user = await pool.query(getUser, [id]);
            if (!user[0]?.id) {
                return res.status(404).json({ message: 'User not found.' });
            }
            return res.status(200).json(user[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

export default userController;
