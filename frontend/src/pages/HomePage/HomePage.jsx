import React, { useState } from "react";
import { searchMovies } from "../../api/searchMovies";
import ClipLoader from "react-spinners/ClipLoader";
import "./style.css"

export function HomePage(){
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [listOfMovies, setListOfMovies] = useState();

  const moviesData = [];
  listOfMovies?.map((item) => {
    moviesData.push(item)
  })

  var handleKeyDown = function(e){
    if(e.key === "Enter"){
      handleSubmit(e);
    }
  }

  function validatingForm(event){
    if(!title){
      alert("Please fill the movie title");
    } else {
      handleSubmit(event);
    }
  }

  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true);
    setListOfMovies((await searchMovies(title)).data.searchMovies);
    setLoading(false);
    setTitle("");
  }

  return(
    <div>
      {
        loading?
        <div className="loader-container">
          <ClipLoader color={"#000000"} loading={loading} size={100} />
        </div>
        :
        <div className="finder-container">
          <form className="finder-form">
            <h2>Movie finder</h2>
            <input type="text" id="inputfield" placeholder="Movie title" autoFocus onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
            <button type="submit" id="searchButton" onClick={(e) => validatingForm(e)}>Search</button>
          </form>

          {
          moviesData.map((item, index) => {
            return (
              <div key={index} className="movies-list-item">
                <a href="" className="movie-title">{item.name}</a>
                <p className="movie-category">{item.genres.name}</p>
                <p className="movie-score">Score: {item.score}</p>
              </div>
            )
          })
          }
        </div>
      }
    </div>
  )
}