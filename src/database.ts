import mysql, { Pool, MysqlError, PoolConnection, QueryOptions} from 'mysql';
import { DB } from './keys';

class Database {

  public pool: Pool = mysql.createPool(DB);

  constructor(){
    this.pool.getConnection((err: MysqlError, connect: PoolConnection) => {
      if(err)
        throw err;
    
      if(connect) connect.release();
      console.log('DB is connected');
      return;
    })
  }

}

export default new Database().pool;


