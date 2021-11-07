// core
import { Router } from 'express';

// controller
import teacherController from '../controllers/teacher.controller';


class TeacherRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes(): void {
    this.router.get('/:id', teacherController.getOne);
    this.router.put('/update/:id', teacherController.update);
  }
  
}

export default new TeacherRouter().router;