import { Router } from 'express';

class AuthRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes(): void {
    this.router.post('login', );
    this.router.post('logout', );
    this.router.post('forgot', );
    this.router.post('register', );
  }
  
}

export default new AuthRouter().router;