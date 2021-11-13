import { Router, Request, Response } from 'express';
import QuestionController from '../controllers/question.controller';

// auth
import auth from '../lib/auth';

class QuestionRouter {

  public router: Router = Router();

  constructor(){
    this.buildDataRoutes();
    this.buildViewRoutes();
  }

  public buildDataRoutes(): void {
    this.router.post('/register', auth.LoggedIn, QuestionController.register);
    this.router.get('/list', auth.LoggedIn, QuestionController.getAll);
    this.router.get('/delete/:id', auth.LoggedIn, QuestionController.delete);
    this.router.post('/update/:id', auth.LoggedIn, QuestionController.update);
    
  }

  public buildViewRoutes(): void {
    this.router.get('/register', auth.LoggedIn, QuestionController.registerView);
    this.router.get('/update/:id', auth.LoggedIn, QuestionController.updateView);
  }
  
}

export default new QuestionRouter().router;