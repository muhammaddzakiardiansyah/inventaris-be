const response = require("../../helpers/response");
const laboratoriesModel = require("../models/laboratories.model");
 
const laboratoriesController = {
    get : async (req, res) => {
        try {
            const result = await laboratoriesModel.get();
            return response.ok(res, result, 'The request has succeeded', 'http://localhost:4000/api/v1/laboratories');
        } catch (error) {
            return console.log(error);
        }
    },
    add : async (req, res) => {
        try {
            const result = await laboratoriesModel.add(req.body);
            console.log(result, req.body, 'aaaaaaa')
            return response.created(res, result, 'Success Created', 'http://localhost:4000/api/v1/laboratories');
        } catch (error) {
            return console.log(error);
        }
    }
}

module.exports = laboratoriesController;