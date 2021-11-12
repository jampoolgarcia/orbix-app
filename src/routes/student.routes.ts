import { Router } from 'express';
import studentController from '../controllers/student.controller';
import auth from '../lib/auth';

class StudentRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes(): void {
    this.router.get('/score-list', auth.LoggedIn, studentController.listView);
    this.router.post('/login', auth.LoggedOut, studentController.login);
  }

}

export default new StudentRouter().router;