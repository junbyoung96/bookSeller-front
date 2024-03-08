import { BookReviewItem, BookReviewItemWrite } from "@/models/book.model";
import { requestHandler } from "./http";

export const fetchBookReviews = async (bookId: number) => {
    return await requestHandler<BookReviewItem[]>('get', `books/reviews/${bookId}`);
}

export const addBookReview = async (data: BookReviewItemWrite) => {
    return await requestHandler("post", `/books/reviews/`, data);
}

export const fetchReviewAll = async () => {
    return await requestHandler<BookReviewItem>("get", "/reviews");
};