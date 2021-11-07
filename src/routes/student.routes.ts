import { Router, Request, Response } from 'express';

class StudentRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes(): void {
    this.router.get('score-list', this.test);
  }

  public test(req: Request, res: Response): void {
    res.status(201).send({
      ok: true,
      data : "student"
    });
  }
  
}

const R = new StudentRouter();
export default R.router;