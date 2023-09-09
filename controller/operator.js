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

    getDataOperator = (res) => {
        let sql = `SELECT * FROM Employee`
        connection.query(sql,
            function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    return res.status(201).render('../view/pages/report', {
                        response: data
                    });
                }
            }
        )
    }

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

}
module.exports = {
    Operator
}