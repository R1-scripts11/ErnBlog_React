import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import NavBar1 from './ComponentsHTML/NavBar1.jsx';
import Footer from './ComponentsHTML/Footer.jsx';
import Connexion from './Connexion/Connexion.jsx';
import Inscription from './Connexion/Inscription.jsx';
import { AuthProvider } from './AuthContext'; // Importer le AuthProvider
import ProtectedRoute from './ProtectedRoute'; // Importer le ProtectedRoute
import Interface from './Dashboard/Interface.jsx';
import Categorie from './Dashboard/Categorie.jsx';
import CreateArticlePage from './Dashboard/CreateArticlePage.jsx';
import ReadArticle from './ReadArticle/ReadArticle.jsx';
import Users  from './Dashboard/Users.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NavBar1 />
        <div id="main-content">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            } />
            <Route path="/interface" element={<ProtectedRoute><Interface/></ProtectedRoute>}></Route>
            <Route path="/manage-categories" element={<ProtectedRoute><Categorie/></ProtectedRoute>}></Route>
            <Route path="/createArticle" element={<ProtectedRoute><CreateArticlePage/></ProtectedRoute>}></Route>
            <Route path="/article/:article_id" element={<ReadArticle />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="/Inscription" element={<Inscription />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
