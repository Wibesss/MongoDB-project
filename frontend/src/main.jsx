import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

//auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

//privateroute
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/user/Profile.jsx";

//adminroute
import AdminRoute from "./pages/admin/AdminRoute.jsx";
import UserList from "./pages/admin/UserList.jsx";
import CategoryList from "./pages/admin/CategoryList.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import ProductUpdate from "./pages/admin/ProductUpdate.jsx";
import AllProdutcs from "./pages/admin/AllProdutcs.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/products/Favorites.jsx";
import ProductDetails from "./pages/products/ProductDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProdutcs />} />
        {/* <Route path="product/update/:_id" element={<ProductUpdate />} /> */}
      </Route>

      <Route path="/profile" element={<PrivateRoute />}>
        <Route path="" element={<Profile />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
