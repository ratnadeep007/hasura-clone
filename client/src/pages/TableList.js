import { Link } from 'react-router-dom';

import ApiService from "../services/api.service";
import { tableInfo } from '../state';
import TableSummary from "../components/TableSummary";

import { Button } from 'primereact/button';
import {Toast} from 'primereact/toast';

//noinspection
import { view } from '@risingstack/react-easy-state';
import {useEffect, useRef} from "react";

import { useLocation } from 'react-router-dom';

export default view(() => {
    let location = useLocation();
    const toast = useRef(null);

    useEffect(() => {
        checkQueryParams(location.search);
        getTableList()
            .then(res => tableInfo.addTable(res));
    }, [])

    const checkQueryParams = (string) => {
        if (string !== '' && string.includes('create=true')) {
            toast.current.show({
                severity:'success',
                summary: 'Table Created',
                detail:'Your table has been created',
                life: 3000
            });
        } else if (string !== '' && string.includes('create=exists')) {
            toast.current.show({
                severity:'warn',
                summary: 'Table Exists',
                detail:'Table already exists',
                life: 3000
            });
        }
    }

    const getTableList = async () => {
        const apiService = new ApiService();
        return await apiService.getTables();
    }

    const deleteTable = async (tableName) => {
        const apiService = new ApiService();
        const res = await apiService.deleteTable(tableName);
        await getTableList()
            .then(res => tableInfo.addTable(res));
        if (res.status === 200) {
            toast.current.show({
                severity:'success',
                summary: 'Table Deleted',
                detail:'Your table has been deleted',
                life: 3000
            });
        }

    }

    return(
        <div className="p-m-3">
            <div className="p-grid">
                {
                    tableInfo.tables.length < 1 ?
                        <div className="p-d-flex p-flex-row justify-center text-4 p-mb-3 p-ml-2">
                            No Table exists create one now
                        </div> :
                        tableInfo.tables.map((table, index) => <TableSummary
                            key={index}
                            tableName={table.tableName}
                            columns={table.schema}
                            constaints={table.constraints}
                            recordCount={table.recordCount}
                            className="p-col"
                            onDelete={deleteTable}
                        />)
                }
            </div>
            <Link to="/createTable">
                <Button label="Create new table" icon="pi pi-plus" className="p-button-secondary" />
            </Link>
            <Toast ref={toast} />
        </div>
    )
})