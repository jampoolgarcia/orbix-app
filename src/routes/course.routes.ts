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
    this.router.get('/delete/:id', CourseController.delete);
    this.router.post('/update/:id', CourseController.update);
    
  }

  public buildViewRoutes(): void {
    this.router.get('/register', CourseController.registerView);
    this.router.get('/update/:id', CourseController.updateView);
  }
  
}

export default new CourseRouter().router;