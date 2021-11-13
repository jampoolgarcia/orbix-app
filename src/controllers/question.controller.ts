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
    const DATA = await pool.query(`SELECT * FROM pregunta WHERE ID = ?`, [id]);
    // @ts-ignore
    const ELEMENT = DATA[0][0]
    res.render('question/edit', { data: ELEMENT });
  }

  async register(req: Request, res: Response): Promise<void> {
    const DATA: any = req.body;
    const Q: QuestionI = {
      pregunta: DATA.pregunta,
      descriccion: DATA.descriccion,
      fecha_registro: new Date(),
      pk_materia: parseInt(DATA.materia),
      respuestas: `${DATA.respuesta1};${DATA.respuesta2};${DATA.respuesta3};${DATA.respuesta4};`,
      correcta: parseInt(DATA.correcta)
    }
    res.send({
      Q
    })
    // const DATA: QuestionI = req.body;
    // await pool.query(`INSERT INTO pregunta SET ?`, [DATA]);
    // req.flash('success', 'Guardado exitosamente.');
    // res.redirect('/question/list');
  }

  async getAll(req: Request, res: Response): Promise<void>{
    const DATA = await pool.query(`SELECT * FROM pregunta`);
    const LIST = DATA[0];
    res.render('question/list', { list: LIST });
  }

  async delete(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    await pool.query(`DELETE FROM pregunta WHERE ID = ?`, [id]);
    req.flash('danger', `Eliminado de forma exitosa.`);
    res.redirect('/pregunta/list');
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const DATA: QuestionI = req.body;
    await pool.query('UPDATE pregunta SET ? WHERE ID = ?;', [DATA, id]);
    req.flash('warning', 'Actualizado de forma exitosa.');
    res.redirect('/pregunta/list');
  }
}

export default new QuestionController();