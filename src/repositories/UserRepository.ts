import { Cursor, Db } from 'mongodb';
import md5 from 'md5';
import User from '../models/User';

interface CreateUserDTO {
  email: string;
  password: string;
}

class UserRepository {
  private users: Db;

  // receiving the database
  constructor(database: Db) {
    this.users = database;
  }

  // inserting user in the database
  public async create({ email, password }: CreateUserDTO): Promise<User> {
    // md5 encrypts the passed password
    const passwordhash = md5(password);

    const user = new User({ email, password: passwordhash });

    this.users.collection('user').insertOne(user);

    return user;
  }

  // find user in the database
  public async findByUser({
    email,
    password,
  }: CreateUserDTO): Promise<User | null> {
    // md5 encrypts the passed password
    const passwordhash = md5(password);
    const user = new User({ email, password: passwordhash });
    let findUser: User | null = null;

    await this.users
      .collection('user')
      .findOne({ email })
      .then(resp => {
        findUser = resp;
      });

    return findUser ? user : null;
  }

  public async findAllUsers(): Promise<User[] | Cursor> {
    const findUsers: User[] | [] = [];
    await this.users
      .collection('user')
      .find()
      .toArray((err, docs) => {
        if (err) console.log(err);
        console.log(docs);
      });

    return findUsers;
  }
}

export default UserRepository;
