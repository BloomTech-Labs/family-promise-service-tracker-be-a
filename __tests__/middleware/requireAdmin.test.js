const { Request, Response } = require('express');
const createError = require('http-errors');
const { requireAdmin } = require('../../api/middleware/authorization');

describe('Require Admin middleware', () => {
  let mockRequest = Request;
  let mockResponse = Response;
  let nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
  });

  it('should return a 401 error without an admin profile', async () => {
    mockRequest = {
      profile: {
        id: '00uk9lxaulDYOiB4H5d6',
        email: 'bg_user@gmail.com',
        firstName: 'bg_user',
        lastName: 'basic',
        role: 'not_an_admin',
      },
    };

    requireAdmin(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith(
      createError(401, 'User not authorized to perform this action')
    );
  });
  it('should return next with an admin profile', async () => {
    mockRequest = {
      profile: {
        id: '00uk9lxaulDYOiB4H5d6',
        email: 'bg_user@gmail.com',
        firstName: 'bg_user',
        lastName: 'basic',
        role: 'Administrator',
      },
    };

    requireAdmin(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).not.toHaveBeenCalledWith(
      createError(401, 'User not authorized to perform this action')
    );
  });
});
