import { Request, Response, Router } from 'express';
import passport from 'passport';

class AuthRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildViewRoutes();
    this.buildDataRoutes();
  }

  public buildDataRoutes(): void {
    this.router.get('/logout', (req: Request, res: Response) => {
      req.logOut();
      res.redirect('/login');
    });
    
    this.router.post('/register', passport.authenticate('local.register', {
      successRedirect: '/course/list',
      failureRedirect: '/register',
      failureFlash: true
    }));

    this.router.post('/login', passport.authenticate('local.login', {
      successRedirect: '/course/list',
      failureRedirect: '/login',
      failureFlash: true
    }));
  }

  public buildViewRoutes(): void {
    this.router.get('/register', (req: Request, res: Response) => {
      res.render('auth/register')
    });
    this.router.get('/login', (req: Request, res: Response) => {
      res.render('auth/login')
    });
  }
  
}

export default new AuthRouter().router;