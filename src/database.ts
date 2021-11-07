import mysql from 'mysql2/promise';
import { DB } from './keys';

const pool = mysql.createPool(DB)

export default pool;


