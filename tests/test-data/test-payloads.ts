// export const TestData = {
//     POSTS: {
//         VALID_POST: {
//             title: 'QA Interview Test Post',
//             body: 'This is created during API automation testing for interview.',
//             userId: 1
//         },
//         UPDATE_POST: {
//             title: 'Updated Post Title',
//             body: 'Updated body content',
//             userId: 1
//         }
//     }
// };

export const TestData = {
    POSTS: {
        VALID_POST: {
            title: 'QA Interview Test Post',
            body: 'This is created during API automation testing for interview.',
            userId: 1
        },
        UPDATE_POST: {
            title: 'Updated Post Title',
            body: 'Updated body content',
            userId: 1
        },
        PATCH_POST: {
            title: 'Partially Updated Title'
        }
    },

    // Other NEW SECTIONS
    USERS: {
        TEST_USER_ID: 1
    },

    COMMENTS: {
        TEST_POST_ID: 1
    },

    TODOS: {
        INCOMPLETE_TODO: {
            userId: 1,
            title: 'Learn Playwright API Testing',
            completed: false
        }
    }
};