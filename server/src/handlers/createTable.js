const knex = require('../db');

const createTable = async (req, res) => {
    const tableName = req.body['tableName'];
    const strings = req.body['strings'];
    const uuid = req.body["uuid"];
    const integer = req.body["integers"];
    const autoincrement = req.body['autoincrements'];
    const primaryKey = req.body['primaryKey'];
    const foreignKey = req.body['foreignKey'];
    if (await knex.schema.hasTable(tableName)) {
        res.status(400);
        return res.send({
            msg: `Table ${tableName} already exists`
        })
    }
    await knex.schema.createTable(tableName, function (table) {
        if (autoincrement != undefined && autoincrement.length > 0) {
            autoincrement.forEach(name => {
                if (primaryKey == name) {
                    table.increments(name);
                } else {
                    table.increments(name);
                }
            });
        }
        if (strings != undefined && strings.length > 0) {
            strings.forEach(name => {
                table.string(name);
            });
        }
        if (uuid != undefined && uuid.length > 0) {
            uuid.forEach(name => {
                table.uuid(name);
            });
        }
        if (integer != undefined && integer.length > 0) {
            integer.forEach(name => {
                table.integer(name);
            });
        }
        if (foreignKey != undefined && foreignKey.length > 0) {
            foreignKey.forEach(obj => {
                table.foreign(obj.column)
                    .references(obj.foreignTableColumn)
                    .inTable(obj.tableName)
            });
        }
    });
    res.send({
        msg: `Table ${tableName} created successfully`
    })
}

module.exports = createTable;