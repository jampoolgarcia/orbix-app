import mysql from 'mysql2/promise';
import { DB } from './keys';

let pool: any = null

try {
  const pool = mysql.createPool(DB)
} catch(e) {
  throw console.log('Error al conectar a la base de datos...');
}

export default pool;


