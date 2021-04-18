const path = require('path');

const knex = require("knex")({
    client: 'pg',
    connection: 'postgresql://postgres:postgres@localhost:5432/dynamicdb',
});

knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("name");
}).asCallback(function (err) {
    if (err) console.log(err);
    else console.log("done!!!");
})

// console.log(__dirname)