const knex = require('../db');

const dropTable = async (req, res) => {
    const tableName = req.body['tableName'];
    await knex.schema.dropTable(tableName);
    res.send({
        msg: `Table ${tableName} deleted successfully`
    })
}

module.exports = dropTable;