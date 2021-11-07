import { Router, Request, Response } from 'express';

class TeacherRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes(): void {
    this.router.get('/:id', this.test);
    this.router.put('update/:id', this.test);
  }

  public test(req: Request, res: Response): void {
    res.status(201).send({
      ok: true,
      data : "teacher"
    });
  }
  
}

const R = new TeacherRouter();
export default R.router;