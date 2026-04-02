export interface DummyPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags?: string[];
  reactions?: {
    likes?: number;
    dislikes?: number;
  };
  views?: number;
}

export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail: string;
  images?: string[];
  tags?: string[];
}

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  phone?: string;
  company?: {
    title?: string;
    name?: string;
    department?: string;
  };
  age?: number;
  gender?: string;
  username?: string;
}

export interface DummyListResponse<T> {
  total: number;
  skip: number;
  limit: number;
  posts?: DummyPost[];
  products?: DummyProduct[];
  users?: DummyUser[];
}

export type PostListResponse = DummyListResponse<DummyPost>;
export type ProductListResponse = DummyListResponse<DummyProduct>;
export type UserListResponse = DummyListResponse<DummyUser>;

export type ResourceType = 'products' | 'posts' | 'users';
