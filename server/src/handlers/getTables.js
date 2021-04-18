const knex = require('../db');

const getTables = async (req, res) => {
    const tables = await knex.select("tablename")
        .from("pg_catalog.pg_tables")
        .where("schemaname", "public");
    tableInfos = []
    await Promise.all(tables.map(async table => {
        const tableSchema = await knex.table(table['tablename']).columnInfo();
        const oid = await getOID(table['tablename']);
        const constraints = await getPrimaryKeys(oid);
        let tableInfo = {};
        tableInfo['tableName'] = table['tablename'];
        tableInfo['schema'] = tableSchema;
        tableInfo['constraints'] = constraints;
        tableInfos.push(tableInfo);
    }));
    res.send(tableInfos);
}

const getOID = async (tablename) => {
    try {
        const get_oid_query = `SELECT c.oid
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname OPERATOR(pg_catalog.~) '^(${tablename})$' COLLATE pg_catalog.default
  AND pg_catalog.pg_table_is_visible(c.oid);`;
        const oid = await knex.schema.raw(get_oid_query);
        return oid.rows[0]['oid'];
    } catch (err) {
        console.log(err);
    }
}

const getPrimaryKeys = async (oid) => {
    try {
        const get_primary_key_query = `SELECT c2.relname, i.indisprimary, i.indisunique, i.indisclustered, i.indisvalid, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),
  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred, i.indisreplident, c2.reltablespace
FROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i
  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','x'))
WHERE c.oid = '${oid}' AND c.oid = i.indrelid AND i.indexrelid = c2.oid
ORDER BY i.indisprimary DESC, i.indisunique DESC, c2.relname;`;
        const pKey = await knex.schema.raw(get_primary_key_query);
        const rows = pKey.rows;
        if (rows.length > 0) {
            let constraints = [];
            for (let row of rows) {
                constraints.push(row['pg_get_indexdef'])
            }
            return constraints;
        } else return [];
    } catch (err) {
        console.log(err);
    }
}

module.exports = getTables;