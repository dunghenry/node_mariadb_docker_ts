import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import colors from 'colors';
import bodyParser from 'body-parser';
import routes from './routes/index.route';
import getConnection from './configs/connect.db';
const port: Number = +process.env.PORT || 4000;
const app: Express = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
routes(app);
//? Test connect DB an query
(async () => {
    const connection = await getConnection();
    // const rows = await connection.query('SELECT * FROM users');
    // console.log(rows);
})();
app.listen(port, () => {
    console.log(colors.green(`Server listening on http://localhost:${port}`));
});
