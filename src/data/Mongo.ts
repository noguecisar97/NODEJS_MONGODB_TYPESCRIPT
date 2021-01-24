import { MongoClient } from 'mongodb';

const mongodb = new MongoClient(
  'mongodb+srv://JULIOCESAR:07101997@cluster0.0snwu.mongodb.net/users?retryWrites=true&w=majority',
  { useUnifiedTopology: true },
);

export default mongodb;
