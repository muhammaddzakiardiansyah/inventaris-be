const result = (res, data) => {
    console.log(data)
    return res.status(data.status).send({response: {message: data.message || data.error_message, statusCode: data.status, url: data.url, error: data.error_code}, data: data.data});
};
// const result = (res, data) => {
//     console.log(data)
//     return res.status(data.status).send({response: {data}, data: data.data});
// };

const response = {
    ok: (res, data = [], message = 'The request has succeeded', url) => {
      return result(res, {message: message, status: 200, url: url, data: data});
    },
    created: (res, data = [], message = 'Create success', url) => {
      return result(res, { message: message, status: 201, url: url, data: data });
    },
    badRequest: (res, message = 'The server could not understand the request due to invalid syntax', data = [], url) => {
      return result(res, { error_message: message, status: 400, error_code: 'BAD_REQUEST', url: url, data: data });
    },
    notFound: (res, message = 'Resource not found', data = [], url) => {
      return result(res, { error_message: message, status: 404, error_code: 'NOT_FOUND', url: url, data: data });
    },
    serverError: (res, message = 'The server has encountered a situation it doesn`t know how to handle.', data = [], url) => {
      return result(res, { error_message: message, status: 500, error_code: 'INTERNAL_SERVER_ERROR', url: url, data: data });
    },
    invalidToken: (res, data = [], message = 'Token invalid', url) => {
      return result(res, { error_message: message, status: 401, error_code: 'TOKEN_INVALID', url: url, data: data });
    },
    forbidden: (res, data = [], message = 'Forbidden access', url) => {
      return result(res, { error_message: message, status: 403, error_code: 'FORBIDDEN', url: url, data: data });
    },
    unauthorized: (res, data = [], message = 'Unauthorized', url) => {
      return result(res, { error_message: message, status: 401, error_code: 'UNAUTHORIZED', url: url, data: data });
    },
  };

  module.exports = response;