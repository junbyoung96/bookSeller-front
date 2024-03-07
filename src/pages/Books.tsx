import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Pagination from "../components/books/Pagination";
import Empty from "../components/common/Empty";
import Title from "../components/common/Title";
import { useBooks } from "../hooks/useBooks";
import Loading from "@/components/common/Loading";

const Books = () => {
  console.log('books 실행');
  
  const { books, pagination, isEmpty, isBooksLoading } = useBooks();

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
            <Pagination pagination={pagination} />
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
