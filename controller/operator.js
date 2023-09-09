const connection = require('../database/connector')
const { employee } = require('../model/model')
class Operator {
    addEmployeeOperator = (employee, res) => {
        let sql = `INSERT INTO Employee 
        (
            employee_id,
            name,
            Tell,
            Address,
            salary,
            dept_name,
            head_id,
            level
        )
        VALUES
        (
            ?,?,?,?,?,?,?,?
        )`
        connection.query(
            sql, [
            employee.employee_id,
            employee.name,
            employee.Tell,
            employee.Address,
            employee.salary,
            employee.dept_name,
            employee.head_id,
            employee.level,
        ],
            function (err) {
                if (err) {
                    console.log(err)
                    return res.status(201).redirect('/showInformation');
                }
                else {
                    return res.status(201).redirect('/showInformation');
                }
            }
        )
    }

    findHeadOperator = (employee, res) => {
        let sql = `SELECT head_id FROM Employee WHERE dept_name = ?`
        connection.query(sql, [employee.dept_name]),
            function (err,data) {
                if (err) {
                    console.log(err)
                    return res.status(401).send("Head not found");
                }
                else {
                    return res.status(200).send({ response: data });
                }
            }
    }

    showInfoOperator = (res) => {
        let sql = `SELECT * FROM Employee`
        connection.query(sql,
            function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    //console.log(data);
                    return res.status(201).render('../view/pages/showInfo', {
                        response: data
                    });
                }
            }
        )
    }

    deleteInfoOperator = (employee, res) => {
        let sql = `DELETE FROM Employee WHERE employee_id = ?`
        connection.query(sql,[employee],
            function (err, data) {
                if (err) {
                    console.log(err)
                    return res.status(201).redirect('/showInformation');
                }
                else {
                    //console.log(data);
                    return res.status(201).redirect('/showInformation');
                }
            }
        )
    }

    // getDataOperator = (res) => {
    //     let sql = `SELECT * FROM Employee`
    //     connection.query(sql,
    //         function (err, data) {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             else {
    //                 return res.status(201).render('../view/pages/report', {
    //                     response: data
    //                 });
    //             }
    //         }
    //     )
    // }

    getEditUserOperator = (employee,res) => {
        let sql = `SELECT * FROM Employee WHERE employee_id = ?`
        connection.query(sql,[employee],
            function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    return res.status(201).render('../view/pages/editInfo', {
                        response: data
                    });
                }
            }
        )
    }


    editInfoOperator = (user,res) => {
        let sql = `UPDATE Employee
        SET name = ?,
            Tell = ?,
            Address = ?,
            salary = ?,
            dept_name = ?,
            head_id = ?,
            level = ?
        WHERE employee_id = ?`
        connection.query(sql, [
            user.name,
            user.Tell,
            user.Address,
            user.salary,
            user.dept_name,
            user.head_id,
            user.level,
            user.employee_id
        ], function (err) {
            if (err) {
                console.log(err)
            } else {
                return res.status(201).redirect("/showInformation");
            }
        })
    }

    getAllDataOperator = (req, res) => {
        let sql = `SELECT * FROM Compiler`;
        connection.query(sql, function (err, data) {
            if(err){
                console.log(err);
                console.log("ERROR: at getAllDataOperator");
                return res.status(501).send({response: "Not Implement"})
            } else {
                console.log(data);
                return res.status(200).send({response: data});
            }
        })
    }

    addDataOperator = (compiler, res) => {
        console.log(5555);
        console.table(compiler);
        let sql = `INSERT INTO Compiler 
        (
            id,
            src_code,
            output_syntax,
            model_type
        )
        VALUES
        (
            ?,?,?,?
        );`
        connection.query(
            sql, [
            null,
            compiler.src_code,
            compiler.output_syntax,
            compiler.model_type
        ],
            function (err) {
                if (err) {
                    console.log(err)
                    return res.status(501).send({response: "Failed: at addDataOperator"})
                }
                else {
                    // we clear output_syntax because it's concat concat concat until we shuntdown server it's will became zero
                    compiler.output_syntax = "";
                    return res.status(201).redirect('/report')
                    // return res.status(201).send({response: "add data success"})
                }
            }
        )
    }

    deleteDataOperator = (compiler, res) => {
        let sql = `DELETE FROM Compiler WHERE id = ?`
        connection.query(sql,[compiler.id],
            function (err, data) {
                if (err) {
                    console.log(err)
                    return res.status(501).send({response: "Failed: at deleteDataOperator"})
                }
                else {
                    // return res.status(201).send({response: "delete: data success"})
                    return res.status(201).redirect('/report');
                }
            }
        )
    }

    getDataOperator = (res) => {
        let sql = `SELECT * FROM Compiler`
        connection.query(sql,
            function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    return res.status(201).render('../view/pages/report_compiler', {
                        response: data
                    });
                }
            }
        )
    }

    editDataOperator = (compiler, res) => {
        let sql = `UPDATE Compiler
        SET src_code = ?, output_syntax = ?
        WHERE id = ?;`
        connection.query(sql, [compiler.src_code, compiler.output_syntax, compiler.id],
            function (err){
                if (err){
                    console.log(err);
                    return res.status(501).send({response: 'Not Implement'})

                }
                else {
                    return res.status(201).send({response: 'Update finished'})
                }
            }
            )
    }


}
module.exports = {
    Operator
}