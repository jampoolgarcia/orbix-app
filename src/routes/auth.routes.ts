import { Request, Response, Router } from 'express';
import passport from 'passport';
import auth from '../lib/auth';

class AuthRouter {

  public router: Router;

  constructor(){
    this.router = Router();
    this.buildViewRoutes();
    this.buildDataRoutes();
  }

  public buildDataRoutes(): void {
    this.router.get('/logout', auth.LoggedIn, (req: Request, res: Response) => {
      req.logOut();
      res.redirect('/login');
    });
    
    this.router.post('/register', auth.LoggedOut, passport.authenticate('local.register', {
      successRedirect: '/question/list',
      failureRedirect: '/register',
      failureFlash: true
    }));

    this.router.post('/login', auth.LoggedOut, passport.authenticate('local.login', {
      successRedirect: '/question/list',
      failureRedirect: '/login',
      failureFlash: true
    }));
  }

  public buildViewRoutes(): void {
    this.router.get('/register', auth.LoggedOut, (req: Request, res: Response) => {
      res.render('auth/register')
    });
    this.router.get('/login', auth.LoggedOut, (req: Request, res: Response) => {
      res.render('auth/login')
    });
  }
    
}

export default new AuthRouter().router;