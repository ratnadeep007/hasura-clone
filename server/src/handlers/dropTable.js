const knex = require('../db');

const dropTable = async (req, res) => {
    const tableName = req.body['tableName'];
    if (await knex.schema.hasTable(tableName)) {
        try {
            await knex.schema.dropTable(tableName);
            res.send({
                message: `Table ${tableName} deleted successfully`
            })
        } catch (err) {
            console.log(err);
        }
    } else {
        res.send({
            message: `Table ${tableName} doesn't exists`
        })
    }
}

module.exports = dropTable;