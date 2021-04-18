const knex = require('../db');

const selectFromTable = async (req, res) => {
    if (req.query.table) {
        try {
            const data = await knex.select().from(req.query.table);
            res.send(data);
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(400);
        res.send({
            message: 'Table name required'
        })
    }
}

module.exports = selectFromTable;