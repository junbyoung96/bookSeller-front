import { BookReviewItem } from "@/models/book.model";
import Category from "@/models/category.model";
import { http, HttpResponse } from "msw";


const dummy1 = {
    id: 1,
    userName: 'test',
    content: 'test',
    createdAt: 'test',
    score: 1,
}
const reviewData: BookReviewItem[] = [dummy1];

export const reviewsById = http.get("http://localhost:8080/books/reviews/:bookId", () => {    
    return HttpResponse.json(reviewData, {
        status: 200,
    })
});

const category1 = {
    id: 1,
    name: '정치'
}
const categoryDate: Category[] = [category1];

export const categoryMock = http.get("http://localhost:8080/books/category", () => {

    return HttpResponse.json(categoryDate, {
        status: 200,
    });
});