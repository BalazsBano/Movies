import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { searchMovies } from "../../api/searchMovies";
import ClipLoader from "react-spinners/ClipLoader";
import "./style.css"

export function HomePage(){
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  var handleKeyDown = function(e) {
    if(e.key === "Enter"){
      handleSubmit(e)
    }
  }

  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true);
    console.log((await searchMovies(title)).data.searchMovies);
    setLoading(false);
  }

  return(
    <div>
      {
        loading?
        <div className="loader-container">
          <ClipLoader color={"#6d7b7"} loading={loading} size={100} />
        </div>
        :
        <div className="finder-container">
          <h2>Movie finder</h2>
          <input type="text" id="inputfield" placeholder="Movie title" autoFocus onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
          <button type="submit" id="searchButton" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
      }
    </div>
  )
}