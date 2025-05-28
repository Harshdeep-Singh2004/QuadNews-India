import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Notes from "./pages/Notes/Notes.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import News from "./pages/News/News.jsx";
import Article from "./pages/Article/Article.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={ <Login /> } />
      <Route path="/signUp" element={ <SignUp /> } />
      <Route path="/news-dashboard" element={ <ProtectedRoute><News /></ProtectedRoute> }/>
      <Route path="/my-notes" element={ <ProtectedRoute><Notes /></ProtectedRoute> }/>
      <Route path="/article" element={ <ProtectedRoute><Article /></ProtectedRoute> }/>
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
