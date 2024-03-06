import BooksEmpty from "../components/books/BooksEmpty";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Pagination from "../components/books/Pagination";
import Title from "../components/common/Title";
import styled from "styled-components";
import { useBooks } from "../hooks/useBooks";
import Empty from "../components/common/Empty";
import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";

const Books = () => {
  const { books, pagination, isEmpty } = useBooks();
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
          <BooksList books={books} />
        )}
        {!isEmpty && <Pagination pagination={pagination} />}
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
