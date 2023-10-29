import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import { AuthProvider } from './context/authProvider';
import { CookiesProvider } from 'react-cookie';
import AdminLayout from './admin/pages/AdminLayout';
import Layout from './pages/Layout';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <div className="md:container md:mx-auto">
          <AuthProvider>
            <Routes>
              {/** frontend view **/}
              <Route path="/*" element={<Layout />} />
              {/** admin dashboard **/}
              <Route path="/admin/*" element={<AdminLayout />} />
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
