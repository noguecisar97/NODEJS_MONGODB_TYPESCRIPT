import { ObjectID } from 'mongodb';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('User')
class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default User;
