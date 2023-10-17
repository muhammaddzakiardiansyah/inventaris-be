const response = require("../../helpers/response");
const laboratoriesModel = require("../models/laboratories.model");
 
const laboratoriesController = {
    get : async (req, res) => {
        try {
            const result = await laboratoriesModel.get();
            return response.ok(res, result, 'The request has succeeded', 'http://localhost:4000/api/v1/laboratories');
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    },
    detail : async (req, res) => {
        try {
            const result = await laboratoriesModel.detail(req.params.id);
            return response.ok(res, result, 'The request has succeeded', `http://localhost:4000/api/v1/laboratories/${req.params.id}`);
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    },
    add : async (req, res) => {
        try {
            const result = await laboratoriesModel.add(req.body);
            console.log(result, req.body, 'aaaaaaa')
            return response.created(res, result, 'Success Created', 'http://localhost:4000/api/v1/laboratories');
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
            const result = await laboratoriesModel.edit(request);
            return response.ok(res, result, 'Success edit', `http://localhost:4000/api/v1/laboratories/${request.id}`);
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    },
    remove : async (req, res) => {
        try {
            const result = await laboratoriesModel.remove(req.params.id);
            return response.ok(res, result, 'success deleted', `http://localhost:4000/api/v1/laboratories/${req.params.id}`);
        } catch (error) {
            return response.badRequest(res, error.message);
        }
    }
}

module.exports = laboratoriesController;