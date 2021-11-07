import { Request, Response } from 'express';

class AuthController {

  login(req: Request, res: Response): void {
    res.status(200).send({
      ok: true,
      data: 'auth'
    })
  }

  logout(req: Request, res: Response): void {
    res.status(200).send({
      ok: true,
      data: 'auth'
    })
  }

  forgot(req: Request, res: Response): void {
    res.status(200).send({
      ok: true,
      data: 'auth'
    })
  }

  register(req: Request, res: Response): void {
    res.status(200).send({
      ok: true,
      data: 'auth'
    })
  }

}

export default new AuthController();