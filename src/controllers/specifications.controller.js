const response = require('../../helpers/response');
const specificationsModel = require('../models/specifications.model');

const specificationsController = {
    get : async (req, res) => {
        try {
            const result = await specificationsModel.get();
            return response.ok(res, result, 'The request has succeeded', 'http://localhost:4000/api/v1/specifications');
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    },
    detail : async (req, res) => {
        try {
            const result = await specificationsModel.detail(req.params.id);
            return response.ok(res, result, 'The request has succeeded', `http://localhost:4000/api/v1/specifications/${req.params.id}`);
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    },
    add : async (req, res) => {
        try {
            const result = await specificationsModel.add(req.body);
            return response.created(res, result, 'Success Created', 'http://localhost:4000/api/v1/specifications');
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    },
    edit : async (req, res) => {
        try {
            const request = {
                ...req.body,
                id: req.params.id
            }
            const result = await specificationsModel.edit(request);
            return response.ok(res, result, 'Success edit', `http://localhost:4000/api/v1/specifications/${request.id}`);
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    },
    remove : async (req, res) => {
        try {
            const result = await specificationsModel.remove(req.params.id);
            return response.ok(res, result, 'success deleted', `http://localhost:4000/api/v1/specifications/${req.params.id}`);
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    }
}

module.exports = specificationsController;