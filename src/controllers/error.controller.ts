import { Request, Response, NextFunction} from 'express'

class ErrorController {

  registerError(req: Request, res: Response, next: NextFunction){
    try {
      console.log("--------req.body------------", req.body);
      console.log("--------next------------", next);
      res.status(500).send('Error internal');
    }catch(err: any) {
      res.status(500).send('An unknown error occured.');
    }
  }
}

export const ERRORC = new ErrorController();