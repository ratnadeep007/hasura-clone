import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import {useEffect, useState} from "react";
import {newTableInfo} from "../state";

const dbTypes = [
    {name: 'String', value: 'strings'},
    {name: 'Integer', value: 'integers'}
]

function ColumnInput(props) {
    const [columnName, setColumnName] = useState('');
    const [columnType, setColumnType] = useState('');

    useEffect(() => {
        if ((columnType !== undefined || columnType !== '')
            && (columnName !== undefined || columnType !== '')) {
            props.onAdd(columnType, columnName);
        }
    }, [columnName, columnType]);

    return (
        <div className="p-d-flex p-flex-row p-mt-4">
            <InputText
                type="text"
                id="columnname"
                value={columnName}
                style={{width: '35%'}}
                placeholder="Column Name"
                onChange={(e) => setColumnName(e.target.value)} />
            <Dropdown
                value={columnType}
                options={dbTypes}
                optionLabel="name"
                editable
                className="p-ml-2"
                placeholder="Select Type for Column"
                onChange={(e) => setColumnType(e.value)}/>
        </div>
    )
}

export default ColumnInput;