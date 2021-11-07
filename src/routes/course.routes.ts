import { Router, Request, Response } from 'express';

class CourseRouter {

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
      data : "course"
    });
  }
  
}

const R = new CourseRouter();
export default R.router;