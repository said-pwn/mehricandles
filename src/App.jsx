import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NotFound from "./Pages/NotFound";
import Main from "./components/Main";
import CandleDetails from "./Pages/CandleDetails";
import Catalog from "./Pages/Catalog";
import { LanguageProvider } from "./context/LanguageContext";
import Cart from "./Pages/Cart";
import Footer from "./components/Footer";
import SendForm from "./Pages/SendForm";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white text-gray-800">
          <Navbar />
          <Cart/>
          <Routes>
            <Route path="/" element={<Hero />} />
           
            <Route path="/main" element={<Main />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<CandleDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <SendForm/>
      <Footer/>
    </LanguageProvider>
  );
}

export default App;
