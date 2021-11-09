import passport from 'passport';
import { Strategy } from 'passport-local';
import { TeacherI } from '../models/teacher'; 
import pool from '../database';
import helpers from './helpers';

passport.use('local.login', new Strategy({
  usernameField: 'usuario',
  passwordField: 'clave',
  passReqToCallback: true
}, async(req, usuario, clave, done) =>{

  const ROWS = await pool.query('SELECT * FROM profesor WHERE usuario = ?', [usuario]);
  // @ts-ignore
  if(ROWS[0].length > 0){
    // @ts-ignore
    const DATA: TeacherI = ROWS[0][0];
    const isValid = await helpers.matchPassword(clave, DATA.clave);
    if(isValid) {
      // @ts-ignore
      done(null, DATA, req.flash('success', `Bienvenido ${DATA.nombre} ${DATA.apellido}...`));
    }else {
      // @ts-ignore
      done(null, false, req.flash('danger', 'La clave es incorrecta.'));
    }
  }else{
    // @ts-ignore
    return done(null, false, req.flash('danger', 'El usuario no se encuentra registrado.'));
  }

}))

passport.use('local.register', new Strategy({
  usernameField: 'usuario',
  passwordField: 'clave',
  passReqToCallback: true
}, async(req, usuario, clave, done) =>{
  const DATA: TeacherI = req.body;
  DATA.clave = await helpers.encryptPassword(DATA.clave);
  const RESULT = await pool.query('INSERT INTO profesor SET ?', [DATA]);
  // @ts-ignore
  DATA.id = RESULT[0].insertId;
  return done(null, DATA);
}))

passport.serializeUser((usuario: any, done) => {
  done(null, usuario.id)
})

passport.deserializeUser( async(id, done) => {
  const ROWS = await pool.query('SELECT * FROM profesor WHERE id = ?', [id]);
  //@ts-ignore
  done(null, ROWS[0][0]);
})