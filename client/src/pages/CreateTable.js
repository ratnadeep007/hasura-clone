import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {useRef, useState} from "react";
import { useHistory } from 'react-router-dom';

//noinspection
import { view } from '@risingstack/react-easy-state';

import { newTableInfo } from '../state';

import ColumnInput from '../components/ColumnInput';
import ApiService from "../services/api.service";

export default view(() =>  {
    const [columnCount, setColumnCount] = useState(2);
    const history = useHistory();

    const setValues = (type , value) => {
        removeValue(value);

        if (type === 'strings' && value !== '') {
            newTableInfo.addStrings(value);
        } else if (type === 'integers' && value !== '') {
            newTableInfo.addIntegers(value);
        }
    }

    const removeValue = (value) => {
        newTableInfo.removeString(value);
        newTableInfo.removeInteger(value);
    }

    const createTable = async () => {
        const apiService = new ApiService();
        const res = await apiService.createTable(newTableInfo.tableInfo);
        if (res.status === 200) {
            history.push('/?create=true');
        } else if (res.status === 400) {
            const resString = await res.json();
            console.log(resString);
            if (resString['msg'].includes('already exists')) {
                history.push('/?create=exists');
            }
        }
        // console.log(newTableInfo.tableInfo);
    }

    return (
        <div className="p-m-6">
            <InputText
                type="text"
                id="tablename"
                value={newTableInfo.tableName}
                style={{width: '35%'}}
                placeholder="Table Name"
                onChange={(e) => newTableInfo.addTableName(e.target.value)} />
            {
                [...Array(columnCount)].map((index, col) => <ColumnInput
                    key={index}
                    onAdd={setValues} />)
            }
            <div className="p-d-flex p-flex-row p-mt-3">
                <Button
                    label="Add new column"
                    icon="pi pi-plus"
                    className="p-button-secondary p-mr-2"
                    onClick={() => setColumnCount(columnCount + 1)} />
                <Button
                    label="Remove last column"
                    icon="pi pi-minus"
                    className="p-button-secondary"
                    onClick={() => setColumnCount(columnCount - 1)} />
            </div>
            <div className="p-mt-3">
                <Button
                    label="Create table"
                    icon="pi pi-check"
                    className="p-button-secondary"
                    onClick={() => createTable()} />
            </div>
        </div>
    )
})