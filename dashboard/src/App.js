import { HomePage } from "./pages/HomePage";
import { LogInPage } from "./pages/LogInPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { UsersPage } from "./pages/UsersPage";
import { OrdersPage } from "./pages/OrdersPage";
import { MessagesPage } from "./pages/MessagesPage";
import { CreateNewProductPage } from "./pages/CreateNewProductPage";
import { UpdateProductPage } from "./pages/UpdateProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/create-new-product" element={<CreateNewProductPage />} />
      <Route path="/update-product/:id" element={<UpdateProductPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/messages" element={<MessagesPage />} />
    </Routes>
  );
}

export default App;
