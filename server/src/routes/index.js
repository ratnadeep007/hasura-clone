const express = require('express');
const router = express.Router();

const createTable = require('../handlers/createTable');
const dropTable = require('../handlers/dropTable');
const getTables = require('../handlers/getTables');

router
    .route('/createTable')
    .post(createTable);

router
    .route('/dropTable')
    .post(dropTable);

router
    .route('/getTables')
    .get(getTables);

module.exports = router;