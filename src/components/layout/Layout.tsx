import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import ThemeSwitcher from "../header/ThemeSwitcher";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <LayoutStyle>
      <Header></Header>
      <ThemeSwitcher></ThemeSwitcher>
      <main>{children}</main>
      <Footer></Footer>
    </LayoutStyle>
  );
}

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;
`;

export default Layout;
