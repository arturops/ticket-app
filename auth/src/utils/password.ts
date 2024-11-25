import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// convert scrypt (uses by default callback) to async
// by returning promises
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    //random string
    const salt = randomBytes(8).toString('hex');
    // hashing the password using scrypt which returns a Buffer (not a string)
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    // remember stored password is the hashed password and salt
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }
}
