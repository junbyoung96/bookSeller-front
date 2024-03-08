import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import { useBooksInfinite } from "@/hooks/useBooksInfinite";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Empty from "../components/common/Empty";
import Title from "../components/common/Title";

const Books = () => {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };
   
  const moreRef = useIntersectionObserver( ([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  if (!books || !pagination || isBooksLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {isEmpty ? (
          <Empty
            icon={<FaSmileWink />}
            title="검색 결과가 없습니다."
            description={<Link to="/books">전체 검색 결과로 이동</Link>}
          ></Empty>
        ) : (
          <>
            <BooksList books={books} />
            {/* <Pagination pagination={pagination} /> */}
            <div className="more" ref={moreRef}>
              <Button
                size="medium"
                scheme="normal"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage}
              >
                {hasNextPage ? "더보기" : "마지막 페이지"}
              </Button>
            </div>
          </>
        )}
      </BooksStyle>
    </>
  );
};

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
