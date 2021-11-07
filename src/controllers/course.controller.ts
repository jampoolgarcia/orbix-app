import { Request, Response } from 'express';
import { CourseI } from '../models/course';
import pool from '../database';
 
class CourseController {
  
  async register(req: Request, res: Response): Promise<void> {
    const DATA: CourseI = req.body;
    console.log(DATA)
    const result = await pool.query('INSERT INTO materia set ?', [DATA]);

    res.send({
      ok: true,
      result
    })
  }

  registerForm(req: Request, res: Response): void {
    res.render('course/register');
  }
}

export default new CourseController();