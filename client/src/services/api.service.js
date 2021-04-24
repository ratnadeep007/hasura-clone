export default class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:8000/'
    }

    getTables() {
        return fetch(`${this.baseURL}getTables`)
            .then(res => res.json());
    }

    createTable(tableInfo) {
        return fetch(`${this.baseURL}createTable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tableInfo)
        })
            .then(res => res);
    }

    deleteTable(tableName) {
        return fetch(`${this.baseURL}dropTable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tableName })
        })
    }
}