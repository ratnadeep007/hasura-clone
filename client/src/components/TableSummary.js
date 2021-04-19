function TableSummary(props) {
    return (
        <div className="p-d-flex p-m-4 p-ai-end">
            <div className="text-4 p-text-bold">{props.tableName}</div>
            <div className="text-2 p-ml-2">Columns: {Object.keys(props.columns).length}</div>
            <div className="text-2 p-ml-2">Constrains: {props.constaints.length}</div>
            <div className="text-2 p-ml-2">Records: {props.recordCount}</div>
        </div>
    )
}

export default TableSummary;