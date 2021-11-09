import bcrypt from 'bcryptjs';

class Helpers {

  async encryptPassword(password: string): Promise<string> {
    const SALT = await bcrypt.genSalt(10);
    const HASH = await bcrypt.hash(password, SALT);
    return HASH;
  }

  async matchPassword(password: string, savePassword: string): Promise<boolean>{
    try {
      return await bcrypt.compare(password, savePassword);
    } catch (err) {
      console.log(err);
    }
    return false;
  }

}

export default new Helpers();