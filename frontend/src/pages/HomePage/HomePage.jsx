import { useState } from "react";
import { searchMovies } from "../../api/searchMovies";
import "./style.css"

export function HomePage(){
  const [title, setTitle] = useState("");

  function handleSubmit(event){
    event.preventDefault();
    searchMovies(title)
  }

  return(
    <div className="finder-container">
        <h2>Movie finder</h2>
        <input type="text" id="input" placeholder="Movie title" autoFocus onChange={(e) => setTitle(e.target.value)}/>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  )
}