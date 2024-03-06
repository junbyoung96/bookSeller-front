import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const { isLoggedIn } = useAuthStore();
    const showAlert = useAlert();
    const [cartAdded, setCartAdded] = useState(false);
    const likeToggle = () => {
        if (!isLoggedIn) {
            showAlert('로그인이 필요합니다.1');
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
                showAlert("로그인이 필요합니다.2");
            });
    };

    useEffect(() => {
        if (!bookId) return;

        fetchBook(bookId).then((book) => setBook(book));
    }, [bookId]);
    
    return { book, likeToggle, addToCart, cartAdded };
};
