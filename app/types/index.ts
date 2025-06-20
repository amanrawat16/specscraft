export interface BlogPost {
  id: string;
  title: string;
  author: string;
  authorId?: string;
  body: string;
  coverImage: string;
  publishedAt: string;
  slug: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: {
    name: string;
    email: string;
  };
  postId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  keyword?: string;
  author?: string;
  tags?: string[];
  sortBy?: 'newest' | 'oldest' | 'title';
}

export interface SearchResult {
  posts: BlogPost[];
  total: number;
  filters: SearchFilters;
}
