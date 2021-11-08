import { Router } from 'express';
import authController from '../controllers/auth.controller';

class AuthRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildViewRoutes();
    this.buildDataRoutes();
  }

  public buildDataRoutes(): void {
    this.router.post('/register', authController.register);
    this.router.post('/login', authController.login);
    this.router.post('/logout', authController.logout);
    this.router.put('/forgot', authController.forgot);
  }

  public buildViewRoutes(): void {
    this.router.get('/register', authController.registerView);
    // this.router.get('/update/:id', authController.forgotView);
    // this.router.get('/update/:id', authController.forgotView);
    // this.router.get('/update/:id', authController.forgotView);
  }
  
}

export default new AuthRouter().router;