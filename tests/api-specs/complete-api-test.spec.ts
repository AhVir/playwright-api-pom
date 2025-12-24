import { test, expect } from '@playwright/test';
import { PostsPage } from '../pages/posts-page';
import { UsersPage } from '../pages/users-page';
import { CommentsPage } from '../pages/comments-page';
import { TodosPage } from '../pages/todos-page';
import { TestData } from '../test-data/test-payloads';

test.describe('JSONPlaceholder Complete API Test Suite', () => {
    // Page Objects
    let postsPage: PostsPage;
    let usersPage: UsersPage;
    let commentsPage: CommentsPage;
    let todosPage: TodosPage;

    // Setup before each test
    test.beforeEach(async ({ request }) => {
        postsPage = new PostsPage(request);
        usersPage = new UsersPage(request);
        commentsPage = new CommentsPage(request);
        todosPage = new TodosPage(request);
    });

    // =====================
    // POSTS ENDPOINT TESTS
    // =====================
    test.describe('POSTS Endpoint - CRUD Operations', () => {
        test('TC-01: GET /posts - should retrieve all posts', async () => {
            const response = await postsPage.getAllPosts();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);

            // Structure Verification
            const firstPost = response.body[0];
            expect(firstPost).toHaveProperty('id');
            expect(firstPost).toHaveProperty('title');
            expect(firstPost).toHaveProperty('body');
            expect(firstPost).toHaveProperty('userId');
        });

        test('TC-02: GET /posts/1 - should retrieve specific post', async () => {
            const response = await postsPage.getPostById(1);

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.userId).toBe(1);
            expect(typeof response.body.title).toBe('string');
        });

        test('TC-03: GET /posts/1/comments - should retrieve comments for post', async () => {
            const response = await postsPage.getPostComments(1);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);

            // All comments should belong to post 1
            response.body.forEach((comment: any) => {
                expect(comment.postId).toBe(1);
            });
        });

        test('TC-04: GET /posts?userId=1 - should filter posts by user', async () => {
            const response = await postsPage.filterPostsByUser(1);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);

            // All posts should belong to user 1
            response.body.forEach((post: any) => {
                expect(post.userId).toBe(1);
            });
        });

        test('TC-05: POST /posts - should create new post', async () => {
            const response = await postsPage.createPost(TestData.POSTS.VALID_POST);

            expect(response.status).toBe(201); // 201 Created
            expect(response.body.title).toBe(TestData.POSTS.VALID_POST.title);
            expect(response.body.body).toBe(TestData.POSTS.VALID_POST.body);
            expect(response.body.userId).toBe(TestData.POSTS.VALID_POST.userId);
            expect(response.body.id).toBeDefined();
        });

        test('TC-06: PUT /posts/1 - should update entire post', async () => {
            const response = await postsPage.updatePost(1, TestData.POSTS.UPDATE_POST);

            expect(response.status).toBe(200);
            expect(response.body.title).toBe(TestData.POSTS.UPDATE_POST.title);
            expect(response.body.body).toBe(TestData.POSTS.UPDATE_POST.body);
        });

        test('TC-07: PATCH /posts/1 - should partially update post', async () => {
            const response = await postsPage.patchPost(1, TestData.POSTS.PATCH_POST);

            expect(response.status).toBe(200);
            expect(response.body.title).toBe(TestData.POSTS.PATCH_POST.title);
        });

        test('TC-08: DELETE /posts/1 - should delete post', async () => {
            const response = await postsPage.deletePost(1);

            expect(response.status).toBe(200);
            // DELETE should return empty response
        });
    });

    // =====================
    // USERS ENDPOINT TESTS
    // =====================
    test.describe('USERS Endpoint', () => {
        test('TC-09: GET /users - should retrieve all users', async () => {
            const response = await usersPage.getAllUsers();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(10); // Considering 10 users

            // Structure Verification
            const firstUser = response.body[0];
            expect(firstUser).toHaveProperty('id');
            expect(firstUser).toHaveProperty('name');
            expect(firstUser).toHaveProperty('username');
            expect(firstUser).toHaveProperty('email');
            expect(firstUser).toHaveProperty('address');
        });

        test('TC-10: GET /users/1 - should retrieve specific user', async () => {
            const response = await usersPage.getUserById(1);

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.username).toBe('Bret');
            expect(response.body.email).toBe('Sincere@april.biz');
        });

        test('TC-11: GET /users/1/posts - should retrieve posts by user', async () => {
            const response = await usersPage.getUserPosts(1);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);

            // All posts should belong to user 1
            response.body.forEach((post: any) => {
                expect(post.userId).toBe(1);
            });
        });

        test('TC-12: GET /users/1/todos - should retrieve todos by user', async () => {
            const response = await usersPage.getUserTodos(1);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);

            // All todos should belong to user 1
            response.body.forEach((todo: any) => {
                expect(todo.userId).toBe(1);
            });
        });
    });

    // ========================
    // COMMENTS ENDPOINT TESTS
    // ========================
    test.describe('COMMENTS Endpoint', () => {
        test('TC-13: GET /comments - should retrieve all comments', async () => {
            const response = await commentsPage.getAllComments();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);

            // Structure Verification
            const firstComment = response.body[0];
            expect(firstComment).toHaveProperty('id');
            expect(firstComment).toHaveProperty('postId');
            expect(firstComment).toHaveProperty('email');
            expect(firstComment).toHaveProperty('body');
        });

        test('TC-14: GET /comments?postId=1 - should filter comments by post', async () => {
            const response = await commentsPage.filterCommentsByPost(1);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);

            // All comments should belong to post 1
            response.body.forEach((comment: any) => {
                expect(comment.postId).toBe(1);
            });
        });
    });

    // =====================
    // TODOS ENDPOINT TESTS
    // =====================
    test.describe('TODOS Endpoint', () => {
        test('TC-15: GET /todos - should retrieve all todos', async () => {
            const response = await todosPage.getAllTodos();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);

            // ToDo Structure Verification
            const firstTodo = response.body[0];
            expect(firstTodo).toHaveProperty('id');
            expect(firstTodo).toHaveProperty('userId');
            expect(firstTodo).toHaveProperty('title');
            expect(firstTodo).toHaveProperty('completed');
        });

        test('TC-16: GET /todos?completed=false - should filter incomplete todos', async () => {
            const response = await todosPage.filterTodosByStatus(false);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);

            // All todos should be incomplete
            response.body.forEach((todo: any) => {
                expect(todo.completed).toBe(false);
            });
        });

        test('TC-17: GET /todos/1 - should retrieve specific todo', async () => {
            const response = await todosPage.getTodoById(1);

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(typeof response.body.title).toBe('string');
        });
    });

    // ============================
    // NEGATIVE & EDGE CASE TESTS
    // ============================
    test.describe('Negative and Edge Cases', () => {
        test('TC-18: GET /posts/99999 - non-existent post returns empty', async () => {
            const response = await postsPage.getPostById(99999);

            expect(response.status).toBe(404); // JSONPlaceholder returns 200 with empty
            // expect(Object.keys(response.body).length).toBe(0);
        });

        test('TC-19: GET /invalid-endpoint - should return 404', async ({ request }) => {
            const response = await request.get('https://jsonplaceholder.typicode.com/invalid-endpoint');
            expect(response.status()).toBe(404);
        });

        test('TC-20: POST /posts with empty body - should still simulate success', async () => {
            const response = await postsPage.createPost({});

            // JSONPlaceholder mostly simulates success even with empty data
            expect(response.status).toBe(201);
            expect(response.body.id).toBeDefined();
        });

        test('TC-21: GET /posts?userId=999 - non-existent user returns empty array', async () => {
            const response = await postsPage.filterPostsByUser(999);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });

        test('TC-22: GET /todos?completed=invalid - should still return data', async () => {
            // Test with invalid boolean string
            const response = await todosPage.filterTodosByStatus('invalid' as any);

            expect(response.status).toBe(200);
            // API should handle invalid query params gracefully
        });
    });
});