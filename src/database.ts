import mysql from 'mysql2/promise';
import { DB } from './keys';

let pool: any = null

pool = mysql.createPool(DB)

export default pool;


