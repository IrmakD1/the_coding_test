jest.mock('express');

const express = require('express');
const App = require('./app');

const use = jest.fn();

express.mockImplementationOnce(() => ({
  use,
}));

describe('app function', () => {
  test('calls correct middleware stack', () => {
    const myRouter = jest.fn();
    App(myRouter);
    expect(use).toBeCalledWith('/', myRouter);
  });
});
