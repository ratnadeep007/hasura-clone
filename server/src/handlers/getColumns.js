const knex = require('../db');

const getColumns = async (req, res) => {
    if (req.query.table) {
        const columnInfos = await knex.table(req.query.table).columnInfo();
        let columns = [];
        for (const [key, value] of Object.entries(columnInfos)) {
            let columnInfo = { columnName: key, ...value };
            columns.push(columnInfo);
        }
        res.send(columns);
    } else {
        res.status(400);
        res.send({
            message: 'Table name is required'
        });
    }
}

module.exports = getColumns;