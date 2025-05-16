import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import './App.css';

const App = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_API_KEY
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=pl', options)
      .then(res => res.json())
      .then(res => {
        const categoryName = res.genres.map(category => (
          {
            id: category.id,
            name: category.name
          }
        ));

        setCategories([{ id: 1.1, name: "Wszystkie" }, ...categoryName]);
      })
      .catch(err => console.error(err));
  }, []);

  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [searchQuery, setSearchQuery] = useState("");

  const searchMenuProps = {
    categories,
    activeCategory,
    searchQuery,
    setActiveCategory,
    setSearchQuery
  }


  return (
    <React.StrictMode>
      <Header categories={categories} searchMenuProps={searchMenuProps}/>
      <Main categories={categories} searchMenuProps={searchMenuProps}/>
    </React.StrictMode>
  );
};

export default App;