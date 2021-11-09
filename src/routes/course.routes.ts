// core
import { Router } from 'express';

// controller
import CourseController from '../controllers/course.controller';

// auth
import auth from '../lib/auth';

class CourseRouter {

  public router: Router = Router();

  constructor(){
    this.buildDataRoutes();
    this.buildViewRoutes();
  }

  public buildDataRoutes(): void {
    this.router.post('/register', auth.LoggedIn, CourseController.register);
    this.router.get('/list', auth.LoggedIn, CourseController.getAll);
    this.router.get('/delete/:id', auth.LoggedIn, CourseController.delete);
    this.router.post('/update/:id', auth.LoggedIn, CourseController.update);
    
  }

  public buildViewRoutes(): void {
    this.router.get('/register', auth.LoggedIn, CourseController.registerView);
    this.router.get('/update/:id', auth.LoggedIn, CourseController.updateView);
  }
  
}

export default new CourseRouter().router;