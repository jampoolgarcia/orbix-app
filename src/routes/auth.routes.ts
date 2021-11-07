import { Router } from 'express';
import authController from '../controllers/auth.controller';

class AuthRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes(): void {
    this.router.post('login', authController.login);
    this.router.post('logout', authController.logout);
    this.router.put('forgot', authController.forgot);
    this.router.post('register', authController.register);
  }
  
}

export default new AuthRouter().router;