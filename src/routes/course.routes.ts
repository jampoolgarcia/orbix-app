// core
import { Router } from 'express';

// controller
import CourseController from '../controllers/course.controller';

class CourseRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildDataRoutes();
    this.buildViewRoutes();
  }

  public buildDataRoutes(): void {
    this.router.post('/register', CourseController.register);
    this.router.get('/list', CourseController.getAll);
    // this.router.put('update', this.test);
    // this.router.post('delete', this.test);
  }

  public buildViewRoutes(): void {
    this.router.get('/register', CourseController.registerForm);
  }
  
}

export default new CourseRouter().router;