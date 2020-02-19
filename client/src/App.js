import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from "./Movies/MovieUpdate";
import AddMovie from "./Movies/AddMovie";

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
          return <MovieUpdate {...props} />
        }}
      />
      <Route path="/add-movie"
        component={AddMovie}
      />
    </>
  );
};

export default App;
