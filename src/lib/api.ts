import {
  PostListResponse,
  ProductListResponse,
  UserListResponse,
  DummyPost,
  DummyProduct,
  DummyUser,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "https://dummyjson.com";

interface FetchParams {
  query?: string;
  category?: string;
  pageParam?: number;
  limit?: number;
}

export const fetchPosts = async ({
  query = "",
  category = "",
  pageParam = 0,
  limit = 20,
}: FetchParams): Promise<PostListResponse> => {
  let url = `${BASE_URL}/posts`;

  if (query) {
    url = `${BASE_URL}/posts/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${pageParam}`;
  } else if (category && category !== "all") {
    url = `${BASE_URL}/posts/category/${category}?limit=${limit}&skip=${pageParam}`;
  } else {
    url = `${BASE_URL}/posts?limit=${limit}&skip=${pageParam}`;
  }

  const response = await fetch(url, {
    cache: query ? "no-store" : "default",
    next: query ? { revalidate: 0 } : { revalidate: 3600 },
  });

  if (!response.ok) throw new Error("Post registry fetch failed");
  return response.json();
};

export const fetchProducts = async ({
  query = "",
  category = "",
  pageParam = 0,
  limit = 20,
}: FetchParams): Promise<ProductListResponse> => {
  let url = `${BASE_URL}/products`;

  if (query) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${pageParam}`;
  } else if (category && category !== "all") {
    url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${pageParam}`;
  } else {
    url = `${BASE_URL}/products?limit=${limit}&skip=${pageParam}`;
  }

  const response = await fetch(url, {
    cache: query ? "no-store" : "default",
    next: query ? { revalidate: 0 } : { revalidate: 3600 },
  });

  if (!response.ok) throw new Error("Product registry fetch failed");
  return response.json();
};

export const fetchUsers = async ({
  query = "",
  pageParam = 0,
  limit = 20,
}: FetchParams): Promise<UserListResponse> => {
  let url = query
    ? `${BASE_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${pageParam}`
    : `${BASE_URL}/users?limit=${limit}&skip=${pageParam}`;

  const response = await fetch(url, {
    cache: query ? "no-store" : "default",
    next: query ? { revalidate: 0 } : { revalidate: 3600 },
  });

  if (!response.ok) throw new Error("User registry fetch failed");
  return response.json();
};

export const fetchPostDetail = async (
  id: string | number,
): Promise<DummyPost> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) throw new Error("Post detail fetch failed");
  return response.json();
};

export const fetchProductDetail = async (
  id: string | number,
): Promise<DummyProduct> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error("Product detail fetch failed");
  return response.json();
};

export const fetchUserDetail = async (
  id: string | number,
): Promise<DummyUser> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error("User detail fetch failed");
  return response.json();
};

export const fetchProductCategories = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/products/category-list`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};
