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
    app.use('/api/auth', authRouter);
    app.use('/api/teacher', teacherRouter);
    app.use('/api/question', questionsRoutes);
    app.use('/api/course', courseRoutes);
    app.use('/api/student', studentRoutes);
    // app.use('**', (req: Request, res: Response) => {
    //   res.redirect('local/api/auth');
    // })
  }

}
