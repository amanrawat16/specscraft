# Specscraft Blog - Modular Architecture

## Overview

This project follows a modular, service-oriented architecture that promotes code reusability, maintainability, and separation of concerns.

## Architecture Structure

### 1. Service Layer (`app/lib/services/`)

The service layer provides a clean abstraction for all business logic and API interactions:

#### BaseService (`baseService.ts`)
- Abstract base class providing common API functionality
- Handles HTTP requests with proper error handling
- Manages authentication headers and base URL configuration

#### PostService (`postService.ts`)
- Extends BaseService for post-related operations
- Methods:
  - `getAllPosts()` - Fetch all blog posts
  - `getPostBySlug(slug)` - Get single post by slug
  - `createPost(data)` - Create new post (requires auth)
  - `updatePost(id, data)` - Update existing post (requires auth)
  - `deletePost(id)` - Delete post (requires auth)

#### UserService (`userService.ts`)
- Extends BaseService for user-related operations
- Methods:
  - `getCurrentUser()` - Get current user profile
  - `updateProfile(data)` - Update user profile (requires auth)

### 2. API Routes (`app/api/`)

All database operations are handled through RESTful API routes:

#### Posts API
- `GET /api/posts` - Get all posts
- `GET /api/posts/[slug]` - Get post by slug
- `POST /api/posts/create` - Create new post (protected)
- `PUT /api/posts/edit/[id]` - Update post (protected)
- `DELETE /api/posts/[id]` - Delete post (protected)

#### Authentication API
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### 3. Types (`app/types/`)

Centralized type definitions:
- `BlogPost` - Blog post interface
- `User` - User interface

### 4. Components (`app/components/`)

Reusable UI components organized by functionality:
- `ui/` - Basic UI components (BlogCard, CreatePostButton, etc.)
- `layout/` - Layout components (Navbar, etc.)

## Key Benefits

### 1. Separation of Concerns
- Business logic is separated from UI components
- API routes handle only HTTP concerns
- Services handle business logic and data transformation

### 2. Reusability
- Services can be used across different parts of the application
- BaseService provides common functionality for all services
- Components are modular and reusable

### 3. Maintainability
- Clear structure makes it easy to find and modify code
- Changes to business logic only require updating services
- API routes are focused and single-purpose

### 4. Testability
- Services can be easily unit tested
- API routes can be tested independently
- Components can be tested in isolation

### 5. Scalability
- Easy to add new services for different entities
- API routes can be extended without affecting services
- Components can be composed to create complex UIs

## Usage Examples

### Using PostService in Components

```typescript
import { PostService } from "@/app/lib/services";

// Get all posts
const posts = await PostService.getAllPosts();

// Create a new post
const newPost = await PostService.createPost({
  title: "My Post",
  author: "John Doe",
  slug: "my-post",
  body: "Post content...",
  coverImage: "https://example.com/image.jpg"
});

// Update a post
await PostService.updatePost(postId, updatedData);

// Delete a post
await PostService.deletePost(postId);
```

### Using UserService

```typescript
import { UserService } from "@/app/lib/services";

// Get current user
const user = await UserService.getCurrentUser();

// Update profile
await UserService.updateProfile({
  name: "New Name",
  email: "newemail@example.com"
});
```

## Best Practices

1. **Always use services for data operations** - Don't call API routes directly from components
2. **Handle errors gracefully** - Services include proper error handling
3. **Use TypeScript interfaces** - All data structures are properly typed
4. **Follow naming conventions** - Services use PascalCase, methods use camelCase
5. **Keep services focused** - Each service handles one domain (posts, users, etc.)

## Future Enhancements

- Add caching layer for better performance
- Implement real-time updates with WebSockets
- Add comprehensive error handling and logging
- Create admin service for administrative operations
- Add search and filtering capabilities 