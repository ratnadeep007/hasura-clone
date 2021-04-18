const express = require('express');
const router = express.Router();

const createTable = require('../handlers/createTable');
const dropTable = require('../handlers/dropTable');
const getTables = require('../handlers/getTables');
const getColumns = require('../handlers/getColumns');
const insertIntoTable = require('../handlers/insertIntoTable');
const selectFromTable = require('../handlers/selectFromTable');

router
    .route('/createTable')
    .post(createTable);

router
    .route('/dropTable')
    .post(dropTable);

router
    .route('/getTables')
    .get(getTables);

router
    .route('/getColumns')
    .get(getColumns);

router
    .route('/insertIntoTable')
    .post(insertIntoTable);

router
    .route('/selectFromTable')
    .get(selectFromTable);

module.exports = router;