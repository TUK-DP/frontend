import axios from "axios";

export class Api {
    base_url = process.env.REACT_APP_SERVER_URL;
    axiosInstance;


    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.base_url,
        });
    }

    async sendRequest(options) {
        const {method, url, data, content_type} = options;

        const config = {
            headers: {
                'Content-Type': content_type,
            },
        };

        return await this.axiosInstance[method](url, data, config);
    }

    async get(url, {data, content_type = 'application/json'} = {}) {
        return await this.sendRequest({method: 'get', url, data, content_type});
    }

    async post(url, {data, content_type = 'application/json'} = {}) {
        return await this.sendRequest({method: 'post', url, data, content_type});
    }
}