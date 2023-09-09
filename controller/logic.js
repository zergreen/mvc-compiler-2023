const { employee } = require('../model/model');
const { Operator } = require('./operator');
const axios = require('axios');
const fs = require('fs');
const { use } = require('../routes/router');
class Logic {

    addEmployeeLogic = (employee, res) => {

        //random name
        let name = '';
        var name_length = 8;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var char_length = characters.length;
        for (var i = 0; i < name_length; i++){
            name += characters.charAt(Math.floor(Math.random() * char_length));
        }
        employee.name = name

        //random Tell phone
        let tellphone_number = '0';
        var phoneNumber_length = 9;
        var charactor_phone = '0123456789';
        char_length = phoneNumber_length;
        for (var i = 0; i < phoneNumber_length; i++){
            tellphone_number += charactor_phone.charAt(Math.floor(Math.random() * phoneNumber_length));
        }
        employee.Tell = tellphone_number;

        //random address
        let num = Math.floor(Math.random() * 100);
        let address = num + ' ';
        var add_length = 15;
        char_length = characters.length;

        for (var i = 0; i < add_length; i++) {
            address += characters.charAt(Math.floor(Math.random() * char_length));
        }

        employee.Address = address

        //random salary
        let salary = Math.floor(Math.random() * 120000) + 15000;
        employee.salary = salary

        //random department name
        let department_name = Math.floor(Math.random() * 3) + 1;
        if (department_name == 1) {
            employee.dept_name = 'IT';
        }
        else if (department_name == 2) {
            employee.dept_name = 'Accounting';
        }
        else if (department_name == 3) {
            employee.dept_name = 'Design';
        }

        //set Head
        employee.head_id = 'Employee'

        //add level
        if (employee.salary <= 40000) {
            employee.level = 'jounior level';
        }
        else if (employee.salary > 40000 && employee.salary < 70000) {
            employee.level = 'middle level'
        } else {
            employee.level = 'senior level'
        }

        new Operator().addEmployeeOperator(employee, res);
        
        console.log("name : ", employee.name,
            " phone : ", employee.Tell,
            " Address : ", employee.Address,
            " salary : ", employee.salary,
            " Head : ", employee.head_id,
            " level : ", employee.level);
    }

    findHeadLogic = (employee, res) => {
        new Operator().findHeadOperator(employee, res);
    }

    showInfoLogic = (res) => {
        new Operator().showInfoOperator(res);
    }

    deleteInfoLogic = (employee,res) => {
        new Operator().deleteInfoOperator(employee,res);
    }
    
    // reportLogic = (res) => {
    //     new Operator().getDataOperator(res);
    // }

    getEditUserLogic = (employee, res) => {
        new Operator().getEditUserOperator(employee, res);
    }

    editUserLogic = (user, res) => {
        if (user.salary <= 40000) {
            user.level = 'jounior level';
        }
        else if (user.salary > 40000 && employee.salary < 70000) {
            user.level = 'middle level';
        } else {
            user.level = 'senior level';
        }
        new Operator().editInfoOperator(user, res);
    }

    uploadFileLogic = (file, res) => {
        if (!file) {
            return res.status(400).send({ Response: "No such file uploaded !" });
        }
    }

    compile(inputCode, model) {
        console.log(888);
        console.log(inputCode);
        console.log(model);
        let tokens = [];
        console.log(1212);
        console.log(inputCode);
        let lines = inputCode.split('\n');
        console.log(lines);
        console.log(2121);
      
        for (let line of lines) {
          line = line.trim();
      
          if (model === 'Model1') {
            if (line.startsWith('declare')) {
              const [keyword, identifier] = line.split(' ');
              tokens.push({ type: 'Keyword', value: keyword });
              tokens.push({ type: 'Identifier', value: identifier });
            } else {
              const parts = line.split(' ');
              for (const part of parts) {
                if (part.match(/^\d+$/)) {
                  tokens.push({ type: 'Literal', value: part });
                } else if (part.match(/^[+=]$/)) {
                  tokens.push({ type: 'Symbol', value: part });
                } else if (part.match(/^[a-zA-Z_]\w*$/)) {
                  tokens.push({ type: 'Identifier', value: part });
                }
              }
            }
          } else if (model === 'Model2') {
            if (line.startsWith('declare')) {
              const [keyword, variable] = line.split(' ');
              tokens.push({ type: 'Keyword and Sign', value: keyword });
              tokens.push({ type: 'Variable', value: variable });
            } else {
              const parts = line.split(' ');
              for (const part of parts) {
                if (part.match(/^\d+$/)) {
                  tokens.push({ type: 'Integer', value: part });
                } else if (part === '=') {
                  tokens.push({ type: 'Assignment', value: part });
                } else if (part === '+') {
                  tokens.push({ type: 'Keyword and Sign', value: part });
                } else if (part.match(/^[a-zA-Z_]\w*$/)) {
                  tokens.push({ type: 'Variable', value: part });
                }
              }
            }
          }
        }

        console.log(tokens);
        return tokens;
      }
      

    addDataLogic = async (compiler, res) => {
        let model1Tokens = await this.compile(compiler.src_code, compiler.model_type);
        model1Tokens.forEach(token => {
            compiler.output_syntax += `${token.value} is ${token.type}` + "\n"
            // temp += `${token.value} is ${token.type}`
            // console.log(`${token.value} is ${token.type}`);});
        })

        // let temp = ''
        // console.table(model1Tokens);

        console.log(4444);
        // compiler.output_syntax = ""
        console.log(compiler.output_syntax);
        console.table(compiler);

        // return res.status(200).send({response: compiler})

        new Operator().addDataOperator(compiler, res);

    }

    getAllDataLogic = (req, res) => {
        new Operator().getAllDataOperator(req, res);
        
    }

    deleteDataLogic = (compiler, res) => {
        new Operator().deleteDataOperator(compiler, res)
    }

    reportLogic = (res) => {
        new Operator().getDataOperator(res);
    }

    editDataEndpointLogic = async (compiler, res) => {
        const model1Tokens = await this.compile(compiler.src_code, compiler.model_type);
        model1Tokens.forEach(token => {
            compiler.output_syntax += `${token.value} is ${token.type}` + "\n"
        })
        new Operator().editDataOperator(compiler, res);
    }

}
module.exports = {
    Logic
}