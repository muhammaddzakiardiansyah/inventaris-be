const response = require("../../helpers/response");
const itemsReturnedModel = require("../models/items_returned.model");
const url = 'http://localhost:4000/api/v1/';

const itemsReturnedController = {
    findAll : async (req, res) => {
        try {
            const result = await itemsReturnedModel.findAll();

            return response.ok(res, result, 'Request has successed!', url)
        } catch (error) {
            if(error.statusCode === 500) {
                return response.serverError(res, error.message, [], url)
            }
            return response.badRequest(res, error.message, [], url)
        }
    },
    findOne : async (req, res) => {
        try {
            const result = await itemsReturnedModel.findOne(req.params.id);

            return response.ok(res, result, 'Request has successed!', `${url}/${req.params.id}`);
        } catch (error) {
            if(error.statusCode === 500) {
                return response.serverError(res, error.message, [], `${url}/${req.params.id}`);
            }
            return response.badRequest(res, error.message, [], `${url}/${req.params.id}`);
        }
    },
    create : async (req, res) => {
        try {
            const result = await itemsReturnedModel.create(req.body);

            return response.created(res, result, 'Success Created!', url);
        } catch (error) {
            if(error.statusCode === 500) {
                return response.serverError(res, error.message, [], url);
            }
            return response.badRequest(res, error.message, [], url);
        }
    },
    edit : async (req, res) => {
        try {
            const request = {
                ...req.body,
                id: req.params.id
            }
            const result = await itemsReturnedModel.edit(request);
            console.log(result, 'controller');
            return response.ok(res, result, 'Success edit!', `${url}/${req.params.id}`)
        } catch (error) {
            if(error.statusCode === 500) {
                return response.serverError(res, error.message, [], `${url}/${req.params.id}`)
            }
            return response.badRequest(res, error.message, [], `${url}/${req.params.id}`)
        }
    },
    remove : async (req, res) => {
        try {
            const result = await itemsReturnedModel.remove(req.params.id);

            return response.ok(res, result, 'Success deleted!', `${url}/${req.params.id}`);
        } catch (error) {
            if(error.statusCode === 500) {
                return response.serverError(res, error.message, [], `${url}/${req.params.id}`);
            }
            return response.badRequest(res, error.message, [], `${url}/${req.params.id}`);
        }
    }
}

module.exports = itemsReturnedController;