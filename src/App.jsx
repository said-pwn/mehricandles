import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./Pages/admin/Login";
import Dashboard from "./Pages/admin/Dashboard";
import Products from "./Pages/admin/Products";
import Categories from "./Pages/admin/Categories";
import Orders from "./Pages/admin/Orders";
import Customers from "./Pages/admin/Customers";
import Settings from "./Pages/admin/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dev from "./Pages/admin/Dev";
import FeaturedProducts from "./components/FeaturedProducts";
import SocialLinks from "./components/SocialLinks";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen bg-white text-gray-800 flex flex-col">
                <Navbar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/product/:id" element={<CandleDetails />} />
                    <Route path="/checkout" element={<SendForm />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <SocialLinks/>
                  
                </div>
                <Footer />
              </div>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="dev" element={<Dev />} />
            <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </LanguageProvider>
  );
}

export default App;
