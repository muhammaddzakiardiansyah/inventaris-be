const Validator = require('fastest-validator');
const validator = new Validator();
const response = require('./response');

const itemsSchema = {
  item_code: { type: 'string' },
  item_name: { type: 'string' },
  registration_number: { type: 'string' },
  brand: { type: 'string' },
  origin: { type: 'string' },
  condition: { type: 'string' },
  amount: { type: 'string' },
  stock: { type: 'string' },
  year_of_purchase: { type: 'string' },
  laboratory_id: { type: 'string' },
};

function validateDataitems(req, res, next) {
  const validateResult = validator.validate(req.body, itemsSchema);
  if (validateResult === true) {
    return next();
  }

  return response.badRequest(res, validateResult[0]);
}

module.exports = validateDataitems;