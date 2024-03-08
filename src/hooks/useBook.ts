import { useEffect, useState } from "react";
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReviews } from "@/api/review.api";
import { useToast } from "./useToast";
import { requestHandler } from "@/api/http";

export const useBook = (bookId: number | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const { isLoggedIn } = useAuthStore();
    const showAlert = useAlert();
    const [cartAdded, setCartAdded] = useState(false);
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const { showToast } = useToast();
    
    const likeToggle = () => {
        if (!isLoggedIn) {
            showAlert('로그인이 필요합니다.');
            return;
        }

        if (!book) return;

        if (book.liked) {
            // unlike 상태 -> like 실행
            unlikeBook(book.id).then(() => {
                setBook(
                    {
                        ...book,
                        liked: false,
                        likes: book.likes - 1,
                    },
                );
                showToast('좋아요가 취소되었습니다');
            });
        } else {
            // unlike 상태 -> like 실행
            likeBook(book.id).then(() => {
                setBook(
                    {
                        ...book,
                        liked: true,
                        likes: book.likes + 1,
                    },
                );
                showToast("좋아요가 성공했습니다");
            });
        }

    }
    const addToCart = (quantity: number) => {
        if (!book) return;

        addCart({
            bookId: book.id,
            quantity,
        })
            .then(() => {
                setCartAdded(true);
                setTimeout(() => {
                    setCartAdded(false);
                }, 3000);
            })
            .catch((err) => {
                //401에러 제외 로직추가.
                showAlert("로그인이 필요합니다.");
            });
    };

    const addReview = (data: BookReviewItemWrite) => {
        if (!book) return;
        
        data = {
            ...data,
            bookId : book.id
        }
                
        addBookReview(data).then((res) => {
            fetchBookReviews(book.id).then((reviews) => setReviews(reviews));
            showAlert(res.message);
        })
    }
    useEffect(() => {
        if (!bookId) return;

        fetchBook(bookId).then((book) => setBook(book));
        fetchBookReviews(bookId).then((reviews) => setReviews(reviews));
    }, [bookId]);

    return { book, likeToggle, addToCart, cartAdded, reviews , addReview};
};
