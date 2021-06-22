const { Request, Response } = require('express');
const createError = require('http-errors');
const { canCrudServiceType } = require('../../api/middleware/authorization');
const { isAssignedToProgram } = require('../../api/middleware/models');

jest.mock('../../api/middleware/models');

describe('canCrudServiceType middleware', () => {
  let mockRequest = Request;
  let mockResponse = Response;
  let nextFunction = jest.fn();
  jest.mock(isAssignedToProgram());

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
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
    canCrudServiceType(mockRequest, mockResponse, nextFunction);
    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).not.toHaveBeenCalledWith(createError(401));
  });

  it('should return next with appropriate program manager', async () => {
    mockRequest = {
      profile: {
        id: '00uk9lxaulDYOiB4H5d6',
        email: 'bg_user@gmail.com',
        firstName: 'bg_user',
        lastName: 'basic',
        role: 'Program Manager',
      },
      body: {
        program_id: 1,
      },
    };
    isAssignedToProgram.mockResolvedValue(true);
    await canCrudServiceType(mockRequest, mockResponse, nextFunction);
    expect(isAssignedToProgram).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).not.toHaveBeenCalledWith(createError(401));
  });

  it('should return 401 error with incorrect program manager', async () => {
    mockRequest = {
      profile: {
        id: '00uk9lxaulDYOiB4H5d6',
        email: 'bg_user@gmail.com',
        firstName: 'bg_user',
        lastName: 'basic',
        role: 'Program Manager',
      },
      body: {
        program_id: 1,
      },
    };
    isAssignedToProgram.mockResolvedValue(false);
    await canCrudServiceType(mockRequest, mockResponse, nextFunction);
    expect(isAssignedToProgram).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith(
      createError(401, 'User not authorized to update services on this program')
    );
  });

  it('should return a 401 with a Service Provider profile', async () => {
    mockRequest = {
      profile: {
        id: '00uk9lxaulDYOiB4H5d6',
        email: 'bg_user@gmail.com',
        firstName: 'bg_user',
        lastName: 'basic',
        role: 'Service Provider',
      },
    };
    canCrudServiceType(mockRequest, mockResponse, nextFunction);
    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith(
      createError(
        401,
        'Service providers not authorized to perform this action'
      )
    );
  });
});
