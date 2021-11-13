import { Request, Response } from "express";
import pool from "../database";
import { StudentI } from "../models/student";
import helpers from "../lib/helpers";
import { QuestionI } from "../models/question";

class StudentController {
  async listView(req: Request, res: Response): Promise<void> {
    const DATA = await pool.query(
      "SELECT * FROM estudiante ORDER BY estudiante.puntos DESC"
    );
    // @ts-ignore
    const LIST = DATA[0];
    res.render("student/list", { list: LIST });
  }

  async login(req: Request, res: Response) {
    const { usuario, clave } = req.query;

    console.log('usuario', usuario);

    if (usuario == null || clave == null)
      return res.send("Usuario y clave invalidos.");

    const ROWS = await pool.query(
      "SELECT * FROM estudiante WHERE usuario = ?",
      [usuario]
    );

    // @ts-ignore
    if (ROWS[0].length > 0) {
      // @ts-ignore
      const DATA: StudentI = ROWS[0][0];
      let c = clave.toString();
      const isValid = helpers.matchPassword(c, DATA.clave);

      if (!isValid) return res.send("La clave es incorrecta.");

      const QUESTIONS = await pool.query(`SELECT * FROM pregunta`);
      //@ts-ignore
      const LIST = QUESTIONS[0].map((el: any) => {
        const Q: QuestionI = {
          id: el.id,
          pk_materia: el.pk_materia,
          pregunta: el.pregunta,
          descripcion: el.descripcion,
          fecha_registro: el.fecha_registro,
          fecha_actualizacion: el.fecha_actualizacion,
          respuesta: el.respuestas.split(";")[el.correcta],
          correcta: el.correcta,
          respuestas: el.respuestas.split(";"),
        };
        return Q;
      });

      res.send({ data: DATA, questions: LIST });
    } else {
      return res.send("El usuario ingresado no se encuentra registrado.");
    }
  }

  async register(req: Request, res: Response) {
    const DATA: StudentI = req.body;
    DATA.puntos = 0;
    DATA.clave = await helpers.encryptPassword(DATA.clave);
    await pool.query(`INSERT INTO estudiante SET ?`, [DATA]);
    const ROWS = await pool.query(`SELECT * FROM pregunta`);
    //@ts-ignore
    const LIST = ROWS[0].map((el: any) => {
      const Q: QuestionI = {
        id: el.id,
        pk_materia: el.pk_materia,
        pregunta: el.pregunta,
        descripcion: el.descripcion,
        fecha_registro: el.fecha_registro,
        fecha_actualizacion: el.fecha_actualizacion,
        respuesta: el.respuestas.split(";")[el.correcta],
        correcta: el.correcta,
        respuestas: el.respuestas.split(";"),
      };
      return Q;
    });

    res.send({ data: DATA, preguntas: LIST });
  }
}

export default new StudentController();
