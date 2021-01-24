import { v4 } from 'uuid';

class User {
  id: string;

  email: string;

  password: string;

  constructor({ email, password }: Omit<User, 'id'>) {
    this.id = v4();
    this.email = email;
    this.password = password;
  }
}

export default User;
