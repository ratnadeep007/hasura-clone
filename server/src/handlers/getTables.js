const knex = require('../db');

const getTables = async (req, res) => {
    const tables = await knex.select("tablename")
        .from("pg_catalog.pg_tables")
        .where("schemaname", "public");
    tableInfos = []
    await Promise.all(tables.map(async table => {
        const tableSchema = await knex.table(table['tablename']).columnInfo();
        let tableInfo = {};
        tableInfo['tableName'] = table['tablename'];
        tableInfo['schema'] = tableSchema;
        tableInfos.push(tableInfo);
    }));
    res.send(tableInfos);
}

module.exports = getTables;