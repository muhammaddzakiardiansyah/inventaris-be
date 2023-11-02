const response = require("../../helpers/response");
const items_borrowedModel = require("../models/items_borrowed.model");
const url = 'http://localhost:4000/api/v1/item-borrowed';

const items_borrowedController = {
    get : async (req, res) => {
        try {
            const result = await items_borrowedModel.get();

            return response.ok(res, result, 'Request has successed!', url)
        } catch (error) {
            return response.badRequest(res, error.message, [], url)
        }
    }
}

module.exports = items_borrowedController;