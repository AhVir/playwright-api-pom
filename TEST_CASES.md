# JSONPlaceholder API Test Cases Documentation

## Project Overview
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com)
- **Framework**: Playwright with TypeScript
- **Architecture**: Page Object Model (POM)
- **Total Tests**: 22 test cases

---

## Test Suite Breakdown

### 1. POSTS Endpoint (8 tests)
| TC-ID | Method | Endpoint | Test Type | Expected Result |
|-------|--------|----------|-----------|-----------------|
| TC-01 | GET | /posts | Positive | Status 200, array of 100 posts |
| TC-02 | GET | /posts/1 | Positive | Status 200, post ID=1 returned |
| TC-03 | GET | /posts/1/comments | Positive | Status 200, comments for post 1 |
| TC-04 | GET | /posts?userId=1 | Positive | Status 200, posts by user 1 |
| TC-05 | POST | /posts | Positive | Status 201, post created with ID |
| TC-06 | PUT | /posts/1 | Positive | Status 200, post fully updated |
| TC-07 | PATCH | /posts/1 | Positive | Status 200, post partially updated |
| TC-08 | DELETE | /posts/1 | Positive | Status 200, post deleted |

### 2. USERS Endpoint (4 tests)
| TC-ID | Method | Endpoint | Test Type | Expected Result |
|-------|--------|----------|-----------|-----------------|
| TC-09 | GET | /users | Positive | Status 200, 10 users returned |
| TC-10 | GET | /users/1 | Positive | Status 200, user ID=1 details |
| TC-11 | GET | /users/1/posts | Positive | Status 200, posts by user 1 |
| TC-12 | GET | /users/1/todos | Positive | Status 200, todos by user 1 |

### 3. COMMENTS Endpoint (2 tests)
| TC-ID | Method | Endpoint | Test Type | Expected Result |
|-------|--------|----------|-----------|-----------------|
| TC-13 | GET | /comments | Positive | Status 200, 500 comments |
| TC-14 | GET | /comments?postId=1 | Positive | Status 200, comments for post 1 |

### 4. TODOS Endpoint (3 tests)
| TC-ID | Method | Endpoint | Test Type | Expected Result |
|-------|--------|----------|-----------|-----------------|
| TC-15 | GET | /todos | Positive | Status 200, 200 todos |
| TC-16 | GET | /todos?completed=false | Positive | Status 200, incomplete todos |
| TC-17 | GET | /todos/1 | Positive | Status 200, todo ID=1 |

### 5. Negative & Edge Cases (5 tests)
| TC-ID | Method | Endpoint | Test Type | Expected Result |
|-------|--------|----------|-----------|-----------------|
| TC-18 | GET | /posts/99999 | Negative | Status 404, empty object |
| TC-19 | GET | /invalid-endpoint | Negative | Status 404 Not Found |
| TC-20 | POST | /posts (empty body) | Edge Case | Status 201, simulated creation |
| TC-21 | GET | /posts?userId=999 | Edge Case | Status 200, empty array |
| TC-22 | GET | /todos?completed=invalid | Edge Case | Status 200, API handles gracefully |

---

## Page Object Model Structure
```text
tests/
├── api-helpers/
│   └── api-client.ts           # HTTP client wrapper
├── pages/                      # Page Objects
│   ├── posts-page.ts           # Posts operations
│   ├── users-page.ts           # Users operations
│   ├── comments-page.ts        # Comments operations
│   └── todos-page.ts           # Todos operations
├── api-specs/                  # Test files
│   ├── posts-api.spec.ts       # Original tests
│   └── complete-api-test.spec.ts # Complete suite
└── test-data/                  # Test data
    └── test-payloads.ts
```

## How to Run Tests
```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run complete test suite only
npx playwright test tests/api-specs/complete-api-test.spec.ts

# Run with UI mode (debugging)
npm run test:ui

# Generate HTML report
npm run test:report

# View HTML report
npm run show-report