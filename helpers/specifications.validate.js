const Validator = require('fastest-validator');
const validator = new Validator();
const response = require('./response');

const specificationsSchema = {
  name: { type: 'string' },
  spec: { type: 'string' },
  laboratory_id: { type: 'string' }
};

function validateDataspecifications(req, res, next) {
  const validateResult = validator.validate(req.body, specificationsSchema);
  if (validateResult) {
    return next();
  }

  return response.badRequest(res, validateResult[0]);
}

module.exports = validateDataspecifications;