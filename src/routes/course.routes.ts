import { Router, Request, Response } from 'express';

class CourseRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes(): void {
    this.router.post('list', this.test);
    this.router.post('update', this.test);
    this.router.post('delete', this.test);
    this.router.post('register', this.test);
  }

  public test(req: Request, res: Response): void {
    res.status(201).send({
      ok: true,
      data : "course"
    });
  }
  
}

const R = new CourseRouter();
export default R.router;