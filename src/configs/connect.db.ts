import mariadb from 'mariadb';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

//todo Config development
export const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit: 5,
    database: process.env.DATABASE,
});

//? Config docker
// export const pool = mariadb.createPool({
//     host: 'mariadb',
//     user: 'root',
//     password: 'admin',
//     connectionLimit: 5,
//     database: 'node_mariadb',
// });

const getConnection = async () => {
    try {
        const conn = await pool.getConnection();
        if (conn) {
            console.log(colors.green('Connected DB successfully'));
        }
        return conn;
    } catch (error) {
        console.log(error);
        console.log(colors.red('Connected DB failed'));
    }
};

export default getConnection;
