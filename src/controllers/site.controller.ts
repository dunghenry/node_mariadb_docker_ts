import { Request, Response } from 'express';
class siteController {
    static getHomePage(req: Request, res: Response) {
        return res.send('Get Home Page Hehe');
    }
}

export default siteController;
