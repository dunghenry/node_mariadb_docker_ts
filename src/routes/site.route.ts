import siteController from '../controllers/site.controller';
import { Router } from 'express';
const router: Router = Router();
router.get('/', siteController.getHomePage);
export default router;
