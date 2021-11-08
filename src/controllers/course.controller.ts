import { Request, Response } from 'express';
import { CourseI } from '../models/course';
import pool from '../database';
 
class CourseController {
  
  async register(req: Request, res: Response): Promise<void> {
    const DATA: CourseI = req.body;
    await pool.query(`INSERT INTO materia set ?`, [DATA]);
    res.send('received');
  }

  registerForm(req: Request, res: Response): void {
    res.render('course/register');
  }

  async getAll(req: Request, res: Response){
    const DATA = await pool.query(`SELECT * FROM materia`);
    const LIST = DATA[0];
    
    res.render('course/list', { list: LIST });
  }
}

export default new CourseController();