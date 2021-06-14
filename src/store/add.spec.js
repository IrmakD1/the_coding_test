const addInitialData = require('./add');
const { Institute, Submission } = require('./mongo');

jest.mock('./mongo', () => ({
  Institute: {
    insertMany: jest.fn(),
  },
  Submission: {
    insertMany: jest.fn(),
  },
}));

describe('addInitialData function', () => {
  test('successfully inserts institute documents', async () => {
    await addInitialData();
    expect(Institute.insertMany).toHaveBeenCalled();
  });
  test('error message is triggered if unsuccesful', async () => {
    Institute.insertMany.mockImplementationOnce(() =>
      Promise.reject(Error('blah'))
    );
    try {
      await addInitialData();
    } catch (err) {
      expect(err).toEqual(Error('blah'));
    }
  });
  test('successfully inserts Submission documents', async () => {
    await addInitialData();
    expect(Submission.insertMany).toHaveBeenCalled();
  });
  test('error message is triggered if unsuccesful', async () => {
    Submission.insertMany.mockImplementationOnce(() =>
      Promise.reject(Error('blah'))
    );
    try {
      await addInitialData();
    } catch (err) {
      expect(err).toEqual(Error('blah'));
    }
  });
});
