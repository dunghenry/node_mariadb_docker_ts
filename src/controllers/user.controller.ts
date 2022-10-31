import User from '../models/user.model';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/User';
import { pool } from '../configs/connect.db';
import {
    checkEmail,
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
} from '../queries/user';
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
    static async updateUser(req: Request, res: Response) {
        const id: number = +req.params.id;
        const { username, email, age }: IUser = req.body;
        try {
            const user = await pool.query(getUser, [id]);
            if (!user[0]?.id) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const data = await pool.query(checkEmail, [email]);
            const arrId = data.filter((item) => item.id !== +id);
            if (arrId.length) {
                return res
                    .status(404)
                    .json({ message: 'Email already exists.' });
            }
            await pool.query(updateUser, [
                username ?? user[0]?.username,
                email ?? user[0]?.email,
                age ?? user[0]?.age,
                id,
            ]);

            return res
                .status(200)
                .json({ message: 'Updated user successfully.' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    static async deleteUser(req: Request, res: Response) {
        const id: number = +req.params.id;
        try {
            const user = await pool.query(getUser, [id]);
            if (!user[0]?.id) {
                return res.status(404).json({ message: 'User not found.' });
            }
            await pool.query(deleteUser, [id]);
            return res
                .status(200)
                .json({ message: 'Deleted user successfully.' });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

export default userController;
