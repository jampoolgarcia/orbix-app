import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import exphbs from 'express-handlebars';
import path from 'path';
import { ERRORC as ErrorController } from './controllers/error.controller';
import { CONFIG } from './keys';
import './database';

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
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(cors());
  }

  public router(): void {
  
    // middlewares manejador de errores
    this.app.use(ErrorController.registerError)
  }

}
