import { ApiClient } from '../api-helpers/api-client';

export class CommentsPage {
    private apiClient: ApiClient;

    constructor(request: any) {
        this.apiClient = new ApiClient(request);
    }

    async getAllComments() {
        return await this.apiClient.get('/comments');
    }

    async filterCommentsByPost(postId: number) {
        return await this.apiClient.get(`/comments?postId=${postId}`);
    }
}