import { store } from '@risingstack/react-easy-state';

const tableInfo = store({
    tables: [],
    addTable: (tableInfoList) => tableInfo.tables = tableInfoList
});

export { tableInfo };