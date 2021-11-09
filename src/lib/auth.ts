import { Request, Response, NextFunction } from 'express';

class Auth {
  
  LoggedIn(req: Request, res: Response, next: NextFunction) {
    if(req.isAuthenticated()){
      return next();
    }
    return res.redirect('/login');
  }
  
  LoggedOut(req: Request, res: Response, next: NextFunction) {
    if(!req.isAuthenticated()){
      return next();
    }
    return res.redirect('/question/list');
  }
}
export default new Auth();