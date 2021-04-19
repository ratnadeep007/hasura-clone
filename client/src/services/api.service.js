export default class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:8001/'
    }

    getTables() {
        return fetch(`${this.baseURL}getTables`)
            .then(res => res.json());
    }
}