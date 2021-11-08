// core
import express, { Router } from 'express';
import path from 'path';

// externals 
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import flash from 'connect-flash';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';

// server
import { ERRORC as ErrorController } from './controllers/error.controller';
import { CONFIG, DB } from './keys';
import './database';

// router
import Routes from './routes';


export class Server {

  private app: express.Application;

  constructor(){
    this.app = express();
    this.config();
    this.middlewares();
    this.router();
  }

  public config(): void{
    this.app.set('port', CONFIG.port);
    this.app.set('views', path.join(__dirname, 'views'))
    this.handlebarsConfig();
    this.app.set('view engine', '.hbs');
  }

  public handlebarsConfig(): void{
    this.app.engine('.hbs', exphbs({
      defaultLayout: 'main',
      layoutsDir: path.join(this.app.get('views'), 'layouts'),
      partialsDir: path.join(this.app.get('views'), 'partials'),
      extname: '.hbs'
    }))
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on port ${this.app.get('port')}`);
    })
  }

  public middlewares(): void {
    this.app.use(session({
      secret: 'jugarobix',
      resave: false,
      saveUninitialized: false,
      // @ts-ignore
      store: new MySQLStore(DB)
    }))
    this.app.use(flash());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(express.static(path.join(__dirname, 'public')));
     // Variables Globales
    this.app.use((req, res, next) => {
      this.app.locals.success = req.flash('success');
      this.app.locals.warning = req.flash('warning');
      this.app.locals.danger = req.flash('danger');
      next();
    })
  }
  
  public router(): void {
    // intancia de la clase que maneja las rutas
    new Routes(this.app);
    // middlewares manejador de errores
    this.app.use(ErrorController.registerError)
  }

}
