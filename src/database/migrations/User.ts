/* eslint-disable import/prefer-default-export */
import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
