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
            const request = {...req.body}
            const result = await itemsModel.add(request);
            return response.created(res, result, 'Success created', 'http://localhost:4000/api/v1/items')
        } catch (error) {
            return response.badRequest(res, error.message)
        }
    },
    edit : async (req, res) => {
        try {
            const request = {
                ...req.body,
                id: req.params.id
            }
            const result = await itemsModel.edit(request);
            return response.ok(res, result, 'The request has successed', `http://localhost:4000/api/v1/items/${request.id}`);
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    }
}

module.exports = itemsController;