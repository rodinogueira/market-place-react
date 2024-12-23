import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
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
        } />,
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
