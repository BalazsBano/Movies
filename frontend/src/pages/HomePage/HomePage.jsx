import { useState } from "react";
import { searchMovies } from "../../api/searchMovies";
import "./style.css"

export function HomePage(){
  const [title, setTitle] = useState("");

  var handleKeyDown = function(e) {
    if(e.key === "Enter"){
      handleSubmit(e)
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    searchMovies(title)
  }

  return(
    <div className="finder-container">
        <h2>Movie finder</h2>
        <input type="text" id="inputfield" placeholder="Movie title" autoFocus onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
        <button type="submit" id="searchButton" onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  )
}