import { Request, Response } from 'express';

class TeacherController {

  getOne(req: Request, res: Response): void {
    res.status(200).send({
      ok: true,
      data: 'teacher'
    })
  }

  update(req: Request, res: Response): void {
    res.status(200).send({
      ok: true,
      data: 'teacher'
    })
  }

}

export default new TeacherController();