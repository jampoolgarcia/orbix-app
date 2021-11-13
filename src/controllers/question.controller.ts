import { Request, Response } from 'express';
import pool from '../database';
import { QuestionI } from '../models/question';
 
class QuestionController {
  
  async registerView(req: Request, res: Response): Promise<void> {
    const DATA = await pool.query(`SELECT * FROM materia`);
    const LIST = DATA[0];
    res.render('question/register', { list: LIST });
  }

  async updateView(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const ROWS = await pool.query(`SELECT * FROM materia`);
    const DATA = await pool.query(`SELECT * FROM pregunta WHERE ID = ?`, [id]);
    // @ts-ignore
    const ELEMENT = DATA[0][0];
    ELEMENT.respuestas = ELEMENT.respuestas.split(';');
    const LIST = ROWS[0];
    res.render('question/edit', { data: ELEMENT, list: LIST });
  }

  async register(req: Request, res: Response): Promise<void> {
    const DATA: any = req.body;
    const Q: QuestionI = {
      pregunta: DATA.pregunta,
      descripcion: DATA.descripcion,
      fecha_registro: new Date(),
      fecha_actualizacion: new Date(),
      pk_materia: parseInt(DATA.materia),
      respuestas: `${DATA.respuesta1};${DATA.respuesta2};${DATA.respuesta3};${DATA.respuesta4}`,
      correcta: parseInt(DATA.correcta)
    }
    await pool.query(`INSERT INTO pregunta SET ?`, [Q]);
    req.flash('success', 'Guardado exitosamente.');
    res.redirect('/question/list');
  }

  async getAll(req: Request, res: Response): Promise<void>{
    const DATA = await pool.query(`SELECT * FROM pregunta`);
    //@ts-ignore
    const LIST = DATA[0].map( (el: any) => {
        const Q: QuestionI = {
          id: el.id,
          pk_materia: el.pk_materia,
          pregunta: el.pregunta,
          descripcion: el.descripcion,
          fecha_registro: el.fecha_registro,
          fecha_actualizacion: el.fecha_actualizacion,
          respuesta: el.respuestas.split(';')[el.correcta],
          correcta: el.correcta,
          respuestas: el.respuestas
        }
        return Q;
      }
    );

    res.render('question/list', { list: LIST });
  }

  async delete(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    await pool.query(`DELETE FROM pregunta WHERE ID = ?`, [id]);
    req.flash('danger', `Eliminado de forma exitosa.`);
    res.redirect('/question/list');
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const DATA: any = req.body;
    const Q: QuestionI = {
      pregunta: DATA.pregunta,
      descripcion: DATA.descripcion,
      fecha_actualizacion: new Date(),
      pk_materia: parseInt(DATA.materia),
      respuestas: `${DATA.respuesta1};${DATA.respuesta2};${DATA.respuesta3};${DATA.respuesta4}`,
      correcta: parseInt(DATA.correcta)
    }
    await pool.query('UPDATE pregunta SET ? WHERE ID = ?;', [Q, id]);
    req.flash('warning', 'Actualizado de forma exitosa.');
    res.redirect('/question/list');
  }
}

export default new QuestionController();