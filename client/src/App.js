import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";
import { CheckOutPage } from "./pages/CheckOutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { SingleProductPage } from "./pages/SingleProductPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts, getTotalAmount } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { pathName } = useLocation();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    dispatch(getTotalAmount());
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckOutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products/:id" element={<SingleProductPage />} />
      <Route path="/orders/:id" element={<OrderDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
