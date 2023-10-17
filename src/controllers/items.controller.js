const response = require('../../helpers/response');
const itemsModel = require("../models/item.model");

const itemsController = {
    get : async (req, res) => {
        try {
            const result = await itemsModel.get();
            return response.ok(res, result, 'The request has successed', 'http://localhost:4000/api/v1/items');
        } catch (error) {
            return response.badRequest(res, error.message, [], 'http://localhost:4000/api/v1/items');
        }
    },
    add : async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = itemsController;