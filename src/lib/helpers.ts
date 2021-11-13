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

  math(lvalue: any, operator: string, rvalue: any): any {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
  }

  ifCond(v1: any, v2: any, options: any): any {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  }

}

export default new Helpers();