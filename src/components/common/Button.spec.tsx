import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import Button from "./Button";

describe("Button 컴포넌트 test", () => {
  it("렌더를 확인", () => {
    //렌더링하는
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );
    //확인하는
    expect(screen.getByText("버튼")).toBeInTheDocument();
  });

  it("size props 확인", () => {
    //렌더링하는
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );
    //확인하는
    expect(screen.getByRole("button")).toHaveStyle({fontSize : '1.5rem'});
  });
  it("opacity props 확인", () => {
    //렌더링하는
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary" disabled={false}>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );
    //확인하는
    expect(screen.getByRole("button")).toHaveStyle({opacity : '1'});
  });
});
