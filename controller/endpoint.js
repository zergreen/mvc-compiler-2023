const { Logic } = require('./logic');
const model = require('../model/model');
const { table } = require('console');
class Endpoint {

    constructor() {
        this.employee = model.employee;
        this.compiler = model.compiler;
    }

    addEmployeeEndpoint = (req, res) => {
        this.employee.employee_id = req.body.employee_id
        new Logic().addEmployeeLogic(this.employee,res);
    }

    findHeadEnpoint = (req, res) => {
        new Logic().findHeadLogic(this.employee, res);
    }

    showInfoEndpoint = (req, res) => {
        new Logic().showInfoLogic(res);
    }

    deleteInfoEndpoint = (req, res) => {
        var id = req.params.id;
        new Logic().deleteInfoLogic(id,res);
    }

    // reportEndpoint = (req, res) => {
    //     new Logic().reportLogic(res);
    // }

    getEditUserEndpoint = (req, res) => {
        var edit_id = req.params.edit_id;
        new Logic().getEditUserLogic(edit_id, res);
    }

    editUserEndpoint = (req, res) => {
        var id = req.params.id;
        this.employee.employee_id = id;
        this.employee.name = req.body.name;
        this.employee.Tell = req.body.Tell;
        this.employee.Address = req.body.Address;
        this.employee.salary = req.body.salary;
        this.employee.dept_name = req.body.dept_name;
        this.employee.head_id = req.body.head_id;
        new Logic().editUserLogic(this.employee,res);
    }

    uploadFileEndpoint = async (req, res) => {
        let filePath = __dirname + "/uploads/" + req.file.originalname
        new Logic().uploadFileLogic(filePath, res);
    }

    addDataEndpoint = (req, res) => {
        this.compiler.src_code = req.body.src_code;
        this.compiler.model_type = req.body.model_type
        console.table(this.compiler);
        new Logic().addDataLogic(this.compiler, res);
    }

    getAllDataEndpoint = (req, res) => {
        new Logic().getAllDataLogic(req, res)
    }

    deleteDataEndpoint = (req, res) => {
        this.compiler.id = req.params.id;
        new Logic().deleteDataLogic(this.compiler, res)
    }

    reportEndpoint = (req, res) => {
        new Logic().reportLogic(res);
    }

    editDataEndpoint = (req, res) => {
        this.compiler.id = req.body.id;
        this.compiler.src_code = req.body.src_code;
        this.compiler.output_syntax = req.body.output_syntax;
        new Logic().editDataEndpointLogic(this.compiler, res)
    }
}
module.exports = {
    Endpoint
}