// import { ApiClient } from '../api-helpers/api-client';

// export class PostsPage {
//     private apiClient: ApiClient;

//     constructor(request: any) {
//         this.apiClient = new ApiClient(request);
//     }

//     async getAllPosts() {
//         return await this.apiClient.get('/posts');
//     }

//     async getPostById(id: number) {
//         return await this.apiClient.get(`/posts/${id}`);
//     }

//     async createPost(postData: any) {
//         return await this.apiClient.post('/posts', postData);
//     }

//     async updatePost(id: number, postData: any) {
//         return await this.apiClient.put(`/posts/${id}`, postData);
//     }

//     async deletePost(id: number) {
//         return await this.apiClient.delete(`/posts/${id}`);
//     }
// }

// export class UsersPage {
//     private apiClient: ApiClient;

//     constructor(request: any) {
//         this.apiClient = new ApiClient(request);
//     }

//     async getAllUsers() {
//         return await this.apiClient.get('/users');
//     }
// }



import { ApiClient } from '../api-helpers/api-client';

export class PostsPage {
    private apiClient: ApiClient;

    constructor(request: any) {
        this.apiClient = new ApiClient(request);
    }

    async getAllPosts() {
        return await this.apiClient.get('/posts');
    }

    async getPostById(id: number) {
        return await this.apiClient.get(`/posts/${id}`);
    }

    async getPostComments(postId: number) {
        return await this.apiClient.get(`/posts/${postId}/comments`);
    }

    async filterPostsByUser(userId: number) {
        return await this.apiClient.get(`/posts?userId=${userId}`);
    }

    async createPost(postData: any) {
        return await this.apiClient.post('/posts', postData);
    }

    async updatePost(id: number, postData: any) {
        return await this.apiClient.put(`/posts/${id}`, postData);
    }

    async patchPost(id: number, postData: any) {
        return await this.apiClient.patch(`/posts/${id}`, postData);
    }

    async deletePost(id: number) {
        return await this.apiClient.delete(`/posts/${id}`);
    }
}

export class UsersPage {
    private apiClient: ApiClient;

    constructor(request: any) {
        this.apiClient = new ApiClient(request);
    }

    async getAllUsers() {
        return await this.apiClient.get('/users');
    }
}