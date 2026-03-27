import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { SellerSignupPage } from './pages/SellerSignupPage';
import { SellerDashboardPage } from './pages/SellerDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PublicProfilePage } from './pages/PublicProfilePage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { HistoryProvider } from './context/HistoryContext';
import { ToastProvider } from './context/ToastContext';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastProvider>
        <AuthProvider>
          <HistoryProvider>
            <WishlistProvider>
              <CartProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  
                  {/* Protected Routes */}
                  <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/p/:id" element={<PublicProfilePage />} />
                  <Route path="/seller/dashboard" element={<ProtectedRoute requireSeller><SellerDashboardPage /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboardPage /></ProtectedRoute>} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/seller/signup" element={<SellerSignupPage />} />
                  
                  <Route path="*" element={<HomePage />} />
                </Routes>
            </CartProvider>
          </WishlistProvider>
        </HistoryProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
