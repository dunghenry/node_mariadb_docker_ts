import { Express } from 'express';
import site from './site.route';
import user from './user.route';
const routes = (app: Express): void => {
    app.use('/', site);
    app.use('/api/users', user);
};

export default routes;
