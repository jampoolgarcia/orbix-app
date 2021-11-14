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
    this.router.post('/register', auth.LoggedOut, studentController.register); 
    this.router.get('/score', auth.LoggedOut, studentController.updateScore);
  }

}

export default new StudentRouter().router;