import { Router, Request, Response } from 'express';

class AuthRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes(): void {
    this.router.post('login', this.test);
    this.router.post('logout', this.test);
    this.router.post('forgot', this.test);
    this.router.post('register', this.test);
  }

  public test(req: Request, res: Response): void {
    res.status(201).send({
      ok: true,
      data : "auth"
    });
  }
  
}

const R = new AuthRouter();
export default R.router;