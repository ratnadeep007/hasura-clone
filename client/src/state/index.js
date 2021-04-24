import { store } from '@risingstack/react-easy-state';

const tableInfo = store({
    tables: [],
    addTable: (tableInfoList) => tableInfo.tables = tableInfoList
});

const newTableInfo = store({
    tableInfo: {
        tableName: '',
        strings: [],
        integers: [],
        foreignKey: []
    },
    addTableName: (tableName) => newTableInfo.tableInfo.tableName = tableName,
    addStrings: (value) => newTableInfo.tableInfo.strings.push(value),
    addIntegers: (value) => newTableInfo.tableInfo.integers.push(value),
    removeString: (value) => newTableInfo.tableInfo.strings =
        newTableInfo.tableInfo.strings.filter(e => e !== value),
    removeInteger: (value) => newTableInfo.tableInfo.integers =
        newTableInfo.tableInfo.integers.filter(e => e !== value)
})

export { tableInfo, newTableInfo };