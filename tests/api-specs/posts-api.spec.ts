import { test, expect } from '@playwright/test';
import { PostsPage } from '../pages/posts-page';
import { TestData } from '../test-data/test-payloads';

test.describe('JSONPlaceholder Posts API Tests with POM', () => {
    let postsPage: PostsPage;

    test.beforeEach(async ({ request }) => {
        postsPage = new PostsPage(request);
    });

    test('GET /posts - should retrieve all posts', async () => {
        const response = await postsPage.getAllPosts();

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        const firstPost = response.body[0];
        expect(firstPost).toHaveProperty('id');
        expect(firstPost).toHaveProperty('title');
        expect(firstPost).toHaveProperty('userId');
    });

    test('GET /posts/1 - should retrieve specific post', async () => {
        const response = await postsPage.getPostById(1);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.userId).toBe(1);
    });

    test('POST /posts - should create new post', async () => {
        const response = await postsPage.createPost(TestData.POSTS.VALID_POST);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe(TestData.POSTS.VALID_POST.title);
        expect(response.body.id).toBeDefined();
    });
});