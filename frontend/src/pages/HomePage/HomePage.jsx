import { Button, Card } from "react-bootstrap";
import { searchMovies } from "../../api/searchMovies";
import "./style.css"

export function HomePage(){
  return(
    <div className="finder-container">
      <h2>Movie finder</h2>
      <input type="text" id="input" placeholder="Movie title" autoFocus/>
      <button>Search</button>
    </div>
  )
}