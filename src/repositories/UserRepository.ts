import { Cursor, Db } from 'mongodb';
import User from '../models/User';

interface CreateUserDTO {
  email: string;
  password: string;
}

interface MongodbDTO {
  _id: string;
  id: string;
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
    const user = new User({ email, password });

    this.users.collection('user').insertOne(user);

    return user;
  }

  // find user in the database
  public async findByUser({
    email,
    password,
  }: CreateUserDTO): Promise<User | null> {
    const user = new User({ email, password });
    let findUser: User | null = null;

    await this.users
      .collection('user')
      .findOne({ email })
      .then(resp => {
        findUser = resp;
      });

    return findUser ? user : null;
  }

  public async findAllUsers(): Promise<
    Pick<MongodbDTO, 'email' | 'password'>[]
  > {
    const users = await this.users
      .collection('user')
      .find({}, { projection: { _id: 0, password: 0 } });

    if ((await users.count()) === 0) {
      return [];
    }
    const findUsers: Omit<MongodbDTO, 'id' | '_id'>[] = [];
    await users.forEach(doc => findUsers.push(doc));

    return findUsers;
  }
}

export default UserRepository;
