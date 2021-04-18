const knex = require('../db');

const insertIntoTable = async (req, res) => {
    const tableName = req.body['table'];
    const valueMaps = req.body['valueMaps'];
    if (tableName && valueMaps) {
        try {
            await knex(tableName)
                .insert(valueMaps);
            res.send({
                message: 'Insert success'
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(400);
        res.send({
            message: 'Table and value map both are requiored'
        })
    }
}

module.exports = insertIntoTable;