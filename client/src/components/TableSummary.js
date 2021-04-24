import { Card } from 'primereact/card';
import { Tooltip } from 'primereact/tooltip';
import { confirmDialog } from 'primereact/confirmdialog';
import ApiService from "../services/api.service";
import {tableInfo} from "../state";

function TableSummary(props) {

    const deleteTableConfirm = () => {
        confirmDialog({
            message: 'Are you sure you want to delete this table?',
            header: 'Delete table',
            icon: 'pi pi-exclamation-triangle',
            accept: () => props.onDelete(props.tableName),
        })
    }

    return (
        <div className="p-m-2">
            <Card title={props.tableName}>
                <div className="p-d-flex p-flex-column">
                    <div className="text-2">
                        <span>Columns</span>: {Object.keys(props.columns).length}
                    </div>
                    <div className="text-2">
                        <span>Constrains</span>: {props.constaints.length}
                    </div>
                    <div className="text-2">
                        <span>Records</span>: {props.recordCount}
                    </div>
                    <div className="p-d-flex p-flex-row p-mt-3 justify-around">
                        <i
                            className="pi pi-plus custom-tooltip-target pointer"
                            data-pr-tooltip="Insert data"
                            data-pr-position="bottom" />
                        <i
                            className="pi pi-info-circle custom-tooltip-target pointer"
                            data-pr-tooltip="More info about table"
                            data-pr-position="bottom" />
                        <i
                            className="pi pi-trash custom-tooltip-target pointer"
                            data-pr-tooltip="Delete table"
                            data-pr-position="bottom"
                            onClick={deleteTableConfirm}/>
                    </div>
                    <Tooltip target=".custom-tooltip-target" />
                </div>
            </Card>
        </div>
    )
}

export default TableSummary;