const connectDb = require('./connect-db');

jest.mock('mongoose', () => ({
  connect: jest.fn(() => ({ catch: jest.fn() })),
}));

const mongoose = require('mongoose');

const mockAuthConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  auth: {
    user: 'Kevin',
    password: 'Bacon',
  },
};

const mockConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  auth: {
    user: 'Kevin',
    password: 'Bacon',
  },
};

describe('Mongo set-up', () => {
  test('Mongoose setup and correct methods with no auth', () => {
    process.env.MONGO_USER = 'Kevin';
    connectDb();
    expect(mongoose.connect).toHaveBeenCalled();
  });
  test('Adds additional auth if user and password set', () => {
    process.env.MONGO_USER = 'Kevin';
    process.env.MONGO_PASSWORD = 'Bacon';
    process.env.MONGO_URL = 'KevinBacon';
    connectDb();
    expect(mongoose.connect).toHaveBeenCalledWith(
      'KevinBacon',
      mockAuthConnectionOptions
    );
  });
});

describe('Mongoose.connect throws error', () => {
  test('Error in mongoose.connect should be thrown', async () => {
    mongoose.connect.mockImplementation(() => Promise.reject(Error('blah')));
    try {
      await connectDb();
    } catch (err) {
      expect(err).toEqual(Error('blah'));
    }
  });
});
