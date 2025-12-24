import { ApiClient } from '../api-helpers/api-client';

export class UsersPage {
    private apiClient: ApiClient;

    constructor(request: any) {
        this.apiClient = new ApiClient(request);
    }

    async getAllUsers() {
        return await this.apiClient.get('/users');
    }

    async getUserById(id: number) {
        return await this.apiClient.get(`/users/${id}`);
    }

    async getUserPosts(userId: number) {
        return await this.apiClient.get(`/users/${userId}/posts`);
    }

    async getUserTodos(userId: number) {
        return await this.apiClient.get(`/users/${userId}/todos`);
    }

    async getUserAlbums(userId: number) {
        return await this.apiClient.get(`/users/${userId}/albums`);
    }
}