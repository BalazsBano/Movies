import React, { useState } from "react";
import { searchMovies } from "../../api/searchMovies";
import { Button, Form, Card, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export function HomePage(){
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [listOfMovies, setListOfMovies] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const moviesData = [];
  listOfMovies?.map((item) => {
    moviesData.push(item)
  })

  function renderingCategories(index){
    var categories = "";
    if(moviesData[index].genres?.length > 0){
      for (let i = 0; i < moviesData[index].genres.length; i++) {
        if(i !== 0){
          categories = categories + ", " + moviesData[index].genres[i].name;
        } else {
          categories = categories + moviesData[index].genres[i].name;
        }
      }
    } else {
      categories = "No categories";
    }
    return categories;
  }

  const clickOnTitle = () => {
    setShow(true)
    // alert("test")
  }

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
          <Card className="formCard">
            <Card.Header>Movie finder</Card.Header>
            <Card.Body>
              <Form className="finder-form">
                <Form.Control className="inputfield" as="input" type="text" placeholder="Movie title" value={title} required autoFocus  onChange={(e) => setTitle(e.target.value)} />
                <Button type="submit" id="searchButton" onClick={(e) => validatingForm(e)}>Search</Button>
              </Form>
            </Card.Body>
          </Card>

          {
          moviesData.map((item, index) => {
            return (
              <div key={index} className="movies-list-item">
                <a href="#" onClick={handleShow} className="movie-title">{item.name}</a>
                <p className="movie-category">{renderingCategories(index)}</p>
                <p className="movie-score">Score: {item.score}</p>
              </div>
            )
          })
          }
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            </Modal.Footer>
          </Modal>
        </div>
      }
    </div>
  )
}