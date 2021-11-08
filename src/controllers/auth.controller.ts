import { Request, Response } from 'express';
import { TeacherI } from '../models/teacher';
import pool from '../database';

class AuthController {

  registerView(req: Request, res: Response): void {
    res.render('auth/register')
  }

  async register(req: Request, res: Response): Promise<void> {
   const DATA: TeacherI = req.body;
    await pool.query('INSERT INTO profesor SET ?', [DATA]);
    req.flash('success', 'Guardado exitosamente.');
    res.send({
      DATA
    })
  }

 

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

}

export default new AuthController();