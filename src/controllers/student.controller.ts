import { Request, Response } from 'express';
import pool from '../database';
 
class StudentController {

  async listView(req: Request, res: Response): Promise<void> {
    const DATA = await pool.query('SELECT * FROM estudiante ORDER BY estudiante.puntos DESC');
    // @ts-ignore
    const LIST = DATA[0];
    res.render('student/list', { list: LIST });
  }

}

export default new StudentController();