import Book, { BookDetail } from "../models/book.model";
import Pagination from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
  categoryId?: number;
  news?: boolean;
  page?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>("/books", {
      params,
    });
    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        page: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string | undefined) => {
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
  return response.data;
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post(`/books/likes/${bookId}`);
  return response.data;
};

export const unlikeBook = async (bookId: number) => {
  const response = await httpClient.delete(`/books/likes/${bookId}`);
  return response.data;
};
