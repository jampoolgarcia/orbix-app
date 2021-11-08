import { Request, Response } from 'express';
import { CourseI } from '../models/course';
import pool from '../database';
 
class CourseController {
  
  registerView(req: Request, res: Response): void {
    res.render('course/register');
  }

  async updateView(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const DATA = await pool.query(`SELECT * FROM materia WHERE ID = ?`, [id]);
    // @ts-ignore
    const ELEMENT = DATA[0][0]
    res.render('course/edit', { data: ELEMENT });
  }

  async register(req: Request, res: Response): Promise<void> {
    const DATA: CourseI = req.body;
    await pool.query(`INSERT INTO materia SET ?`, [DATA]);
    req.flash('success', 'Guardado exitosamente.');
    res.redirect('/api/course/list');
  }

  async getAll(req: Request, res: Response): Promise<void>{
    const DATA = await pool.query(`SELECT * FROM materia`);
    const LIST = DATA[0];
    res.render('course/list', { list: LIST });
  }

  async delete(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    await pool.query(`DELETE FROM materia WHERE ID = ?`, [id]);
    req.flash('danger', `Eliminado de forma exitosa.`);
    res.redirect('/api/course/list');
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const DATA: CourseI = req.body;
    await pool.query('UPDATE materia SET ? WHERE ID = ?;', [DATA, id]);
    req.flash('warning', 'Actualizado de forma exitosa.');
    res.redirect('/api/course/list');
  }
}

export default new CourseController();