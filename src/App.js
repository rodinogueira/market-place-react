import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import Complete from "./Pages/Complete";
import Cart from "./Pages/Cart";
import MyCart from "./Pages/MyCart";
import InfoProduct from "./Pages/InfoProduct";
import NotFound from "./Pages/NotFound";
import NavBar from "./components/NavBar";
import AuthProvider from "./context/AuthContext"
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <>
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <PrivateRoutes>
            <Home/>
          </PrivateRoutes>
        } />
        <Route path="/add-product" element={
          <PrivateRoutes>
            <AddProduct />
          </PrivateRoutes>        
        } />
        <Route path="/admin/edit-product/:id" element={
          <PrivateRoutes>
            <EditProduct />
          </PrivateRoutes>        
        } />
        <Route path="/cart" element={
          <PrivateRoutes>
            <Cart />
          </PrivateRoutes>        
        } />
        <Route path="/admin/my-cart" element={
          <PrivateRoutes>
            <MyCart />
          </PrivateRoutes>        
        } />
        <Route path="/complete" element={
          <PrivateRoutes>
            <Complete />
          </PrivateRoutes>        
        } />
        <Route path="/info-product/:id" element={
          <PrivateRoutes>
            <InfoProduct />
          </PrivateRoutes>        
        } />
        <Route path="/admin" element={
          <PrivateRoutes>
            <Admin/>
          </PrivateRoutes>        
        } />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
