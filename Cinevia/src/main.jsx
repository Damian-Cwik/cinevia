import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Poprawny import dla React Router DOM
import { AuthProvider } from "./AuthContext";

import App from "./App.jsx";
import AuthForm from "./components/AuthForm/AuthForm.jsx";
import Profile from "./components/Profile/Profile.jsx";
import MovieDetails from "./components/MovieDeails/MovieDetalis.jsx";
import MyList from "./components/MyList/MyList.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/mylist/:id" element={<MyList />} />
        <Route path="/movie/:id" element={<MovieDetails type="movie" />} />
        <Route path="/tv/:id" element={<MovieDetails type="tv" />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);