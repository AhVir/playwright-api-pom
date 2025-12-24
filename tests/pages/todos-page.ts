import { ApiClient } from '../api-helpers/api-client';

export class TodosPage {
    private apiClient: ApiClient;

    constructor(request: any) {
        this.apiClient = new ApiClient(request);
    }

    async getAllTodos() {
        return await this.apiClient.get('/todos');
    }

    async getTodoById(id: number) {
        return await this.apiClient.get(`/todos/${id}`);
    }

    async filterTodosByStatus(completed: boolean) {
        return await this.apiClient.get(`/todos?completed=${completed}`);
    }

    async filterTodosByUser(userId: number) {
        return await this.apiClient.get(`/todos?userId=${userId}`);
    }
}