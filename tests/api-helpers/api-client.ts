import { APIRequestContext } from '@playwright/test';

export class ApiClient {
    constructor(private request: APIRequestContext) { }

    // async get(endpoint: string) {
    //     const fullUrl = `https://jsonplaceholder.typicode.com${endpoint}`;
    //     const response = await this.request.get(fullUrl);
    //     return {
    //         status: response.status(),
    //         headers: response.headers(),
    //         body: await response.json()
    //     };
    // }

    async get(endpoint: string) {
        const fullUrl = `https://jsonplaceholder.typicode.com${endpoint}`;
        const response = await this.request.get(fullUrl);

        // Handle different response types
        let body;
        try {
            body = await response.json();
        } catch {
            body = await response.text(); // In case of empty responses
        }

        return {
            status: response.status(),
            headers: response.headers(),
            body: body
        };
    }

    async post(endpoint: string, data: any) {
        const fullUrl = `https://jsonplaceholder.typicode.com${endpoint}`;
        const response = await this.request.post(fullUrl, { data });
        return {
            status: response.status(),
            headers: response.headers(),
            body: await response.json()
        };
    }

    async put(endpoint: string, data: any) {
        const fullUrl = `https://jsonplaceholder.typicode.com${endpoint}`;
        const response = await this.request.put(fullUrl, { data });
        return {
            status: response.status(),
            headers: response.headers(),
            body: await response.json()
        };
    }

    async patch(endpoint: string, data: any) {  // ADD THIS METHOD
        const fullUrl = `https://jsonplaceholder.typicode.com${endpoint}`;
        const response = await this.request.patch(fullUrl, { data });
        return {
            status: response.status(),
            headers: response.headers(),
            body: await response.json()
        };
    }

    async delete(endpoint: string) {
        const fullUrl = `https://jsonplaceholder.typicode.com${endpoint}`;
        const response = await this.request.delete(fullUrl);
        return {
            status: response.status(),
            headers: response.headers(),
            body: await response.text()
        };
    }
}