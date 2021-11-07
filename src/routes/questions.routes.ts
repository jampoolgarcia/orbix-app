import { Router, Request, Response } from 'express';

class QuestionRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes(): void {
    this.router.get('list', this.test);
    this.router.put('update', this.test);
    this.router.post('delete', this.test);
    this.router.post('register', this.test);
  }

  public test(req: Request, res: Response): void {
    res.status(201).send({
      ok: true,
      data : "question"
    });
  }
  
}

const R = new QuestionRouter();
export default R.router;