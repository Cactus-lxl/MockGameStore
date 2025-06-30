import './App.css'
import Login from "./pages/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import Cart from "./pages/Cart.jsx";
import NewAcc from "./pages/NewAcc.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import CheckOutPage from "./pages/CheckOutPage.jsx";
import {Routes, Route} from "react-router-dom";
import {useState} from "react";
import ProtectedRoute from "./service/ProtectedRoute.jsx";
import {CartProvider} from "./context/CartContext.jsx";

//component, returns some jsx code
//always start with cap letter
//the retrun can only have one root element,(can return other divs on the same level)
function App() {
  const [IsValid, setIsValid] = useState(()=>{
    return localStorage.getItem("isLoggedIn") === "true";
  });

  return (
    <CartProvider>
      <main className={"main-content"}>
        <Routes>
          <Route path={"/"} element={<Login setIsValid={setIsValid}/>}/>
          <Route path={"/home"}
            element={
              <ProtectedRoute isLoggedIn={IsValid}>
                <HomePage/>
              </ProtectedRoute>
            } />
          <Route path={"/cart"}
                 element={
                   <ProtectedRoute isLoggedIn={IsValid}>
                     <Cart/>
                   </ProtectedRoute>
                 }/>
          <Route path={"/newacc"} element={<NewAcc/>}/>
          <Route path="/details"
            element={
              <ProtectedRoute isLoggedIn={IsValid}>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/checkoutpage"
                 element={
                   <ProtectedRoute isLoggedIn={IsValid}>
                     <CheckOutPage />
                   </ProtectedRoute>
                 }
          />
        </Routes>
      </main>
    </CartProvider>
  );
}

//can add property by adding {}

export default App
