// core
import { Application, Request, Response } from 'express';

// router
import authRouter from './auth.routes';
import teacherRouter from './teacher.routes';
import questionsRoutes from './questions.routes';
import courseRoutes from './course.routes';
import studentRoutes from './student.routes';

export default class Router {
  constructor(app: Application){
    app.use('/', authRouter);
    app.use('/teacher', teacherRouter);
    app.use('/question', questionsRoutes);
    app.use('/course', courseRoutes);
    app.use('/student', studentRoutes);
    // app.use('**', (req: Request, res: Response) => {
    //   res.redirect('local/api/auth');
    // })
  }

}
