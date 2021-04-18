const express = require('express');
const router = express.Router();

const createTable = require('../handlers/createTable');
const dropTable = require('../handlers/dropTable');
const getTables = require('../handlers/getTables');
const getColumns = require('../handlers/getColumns');

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

module.exports = router;