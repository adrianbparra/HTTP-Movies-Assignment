import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieAddUpdate from "./Movies/MovieAddUpdate";


const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    console.log(movie.id)
    
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        exact path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />

      <Route path="/movies/update-movie/:id" 
        render={props=>{
          return <MovieAddUpdate {...props} />
        }}
      />
      <Route path="/add-movie"
        component={MovieAddUpdate}
      />
    </>
  );
};

export default App;
