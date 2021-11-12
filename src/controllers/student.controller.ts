import { Request, Response } from 'express';
import pool from '../database';
import { StudentI } from '../models/student';
import helpers from '../lib/helpers';
 
class StudentController {

  async listView(req: Request, res: Response): Promise<void> {
    const DATA = await pool.query('SELECT * FROM estudiante ORDER BY estudiante.puntos DESC');
    // @ts-ignore
    const LIST = DATA[0];
    res.render('student/list', { list: LIST });
  }

  async login(req: Request, res: Response) {
    const { usuario, clave } = req.query;

    if(usuario == null || clave == null) return res.send('Usuario y clave invalidos.');

    const ROWS = await pool.query('SELECT * FROM estudiante WHERE usuario = ?', [usuario]);

    // @ts-ignore
    if(ROWS[0].length > 0) {
      // @ts-ignore
      const DATA: StudentI = ROWS[0][0];
      let c = clave.toString()
      const isValid = helpers.matchPassword(c, DATA.clave);
      
      if(!isValid) res.send('La clave es incorrecta.');
      

      res.send({ DATA });
      

    } 
  }

}

export default new StudentController();