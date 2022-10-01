import React, { useState } from "react";
import { searchMovies } from "../../api/searchMovies";
import { Button, Card, Form, Modal } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"

export function HomePage(){
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [listOfMovies, setListOfMovies] = useState();
  const [titleTransfer, setTitleTransfer] = useState("");
  const [descriptionTransfer, setDescriptionTransfer] = useState("");
  const [movieId, setMovieId] = useState("");
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

  function closeModal(){
    handleClose();
    setTitleTransfer("");
    setDescriptionTransfer("");
    setTitle("");
  }

  async function clickOnTitle(title){
    setTitleTransfer(title.target.innerHTML)
    await fetchWiki(title.target.innerHTML)
  }

  function openModal(data){
    setDescriptionTransfer(data.pages[0].description)
    setMovieId(data.pages[0].id)
    handleShow()
  }

  function openWikiPage(id){
    window.open(`https://en.wikipedia.org/?curid=${id}`, '_blank', 'noopener, noreferrer')
  }

  function openTMDBPage(title){
    listOfMovies.map((item) => {
      if(item.name === title){
        window.open(`https://www.themoviedb.org/movie/${item.id}`, '_blank', 'noopener, noreferrer')
      }
    })
  }

  async function fetchWiki(title){
    await fetch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${title}+movie&limit=1`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((response) => openModal(response))
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
                <Card key={index} className="movies-list-item-card">
                  <Card.Body>
                    <Card.Title onClick={clickOnTitle}>{item.name}</Card.Title>
                    <p className="movie-score">Score: {item.score}</p>
                    <p className="movie-category">{renderingCategories(index)}</p>
                  </Card.Body>
                </Card>
              )
            })
          }
        </div>
      }
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
            <Modal.Title>{titleTransfer}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{descriptionTransfer}</Modal.Body>
            <Modal.Footer>
            <Button onClick={() => openWikiPage(movieId)}>
              Wikipedia
            </Button>
            <Button onClick={() => openTMDBPage(titleTransfer)}>
              TMDB
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}