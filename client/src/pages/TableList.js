import ApiService from "../services/api.service";
import { tableInfo } from '../state';
import TableSummary from "../components/TableSummary";

//noinspection
import { view } from '@risingstack/react-easy-state';
import {useEffect} from "react";

export default view(() => {
    useEffect(() => {
        getTableList()
            .then(res => tableInfo.addTable(res));
    }, [])

    const getTableList = async () => {
        const apiService = new ApiService();
        return await apiService.getTables();
    }

    return(
        <div className="p-m-3">
            {
                tableInfo.tables.map((table) => <TableSummary
                    tableName={table.tableName}
                    columns={table.schema}
                    constaints={table.constraints}
                    recordCount={table.recordCount}
                />)
            }
        </div>
    )
})