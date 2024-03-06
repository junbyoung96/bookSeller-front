import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import InputText  from "./InputText";
import React from "react";

describe("InputText 컴포넌트 test", () => {
  it("렌더를 확인", () => {
    //렌더링하는
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력"></InputText>
      </BookStoreThemeProvider>
    );
    //확인하는
    expect(screen.getByPlaceholderText("여기에 입력")).toBeInTheDocument();
  });

  it("forwardedRef 적용", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="gg" ref ={ref}></InputText>
      </BookStoreThemeProvider>
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

//   it("color props 적용", () => {
//     const { container } = render(
//       <BookStoreThemeProvider>
//         <InputText></InputText>
//       </BookStoreThemeProvider>
//     );

//     expect(container?.firstChild).toHaveStyle({ color: "brown" });
//   });
});
