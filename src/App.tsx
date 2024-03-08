import Error from "./components/common/Error";
import Layout from "./components/layout/Layout";
import { BookStoreThemeProvider } from "./context/themeContext";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import ToastContainer from "./components/common/toast/ToastContainer";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home></Home>
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error></Error>
      </Layout>
    ),
  },
  {
    path: "/books",
    element: (
      <Layout>
        <Books></Books>
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Signup></Signup>
      </Layout>
    ),
  },
  {
    path: "/reset",
    element: (
      <Layout>
        <ResetPassword></ResetPassword>
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login></Login>
      </Layout>
    ),
  },
  {
    path: "/books/:bookId",
    element: (
      <Layout>
        <BookDetail></BookDetail>
      </Layout>
    ),
  },
  {
    path: "/carts",
    element: (
      <Layout>
        <Cart></Cart>
      </Layout>
    ),
  },
  {
    path: "/orders",
    element: (
      <Layout>
        <Order></Order>
      </Layout>
    ),
  },
  {
    path: "/orderlist",
    element: (
      <Layout>
        <OrderList></OrderList>
      </Layout>
    ),
  },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BookStoreThemeProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
        </BookStoreThemeProvider>
      </QueryClientProvider>
    </>
  );
}
export default App;
