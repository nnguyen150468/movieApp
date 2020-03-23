import React from 'react';
import { MDBMask, MDBView, MDBContainer } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Card, Spinner, Badge } from 'react-bootstrap';

const MovieCard = (props) => {

    let htmlMovieCard = props.movieList.map(movie => {
        let genreNames = [];
        for (let i=0; i<movie.genre_ids.length; i++){
            if(props.genreList.length > 0){
                let genreName= (props.genreList.find(genre => genre.id === movie.genre_ids[i])).name;
                genreNames.push(genreName);
            }  
        }
        return (
            <Card className="nguyen-card col-md-4 p-3" style={{backgroundColor: 'rgba(40,44,52,0.1'}}>
                  <MDBContainer >
            <MDBView hover zoom>
              <img src={movie.poster_path? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`: `./noposter.jpg`} class="img-fluid" alt={movie.title} />
              <MDBMask className="d-flex container-fluid" overlay="black-strong" >
                  <Card.ImgOverlay className="text-white align-center my-auto scroll text-center">
                  <Card.Title><h3>{movie.title}</h3></Card.Title>
                  <Card.Text className="row d-flex justify-content-center">
                        {genreNames.map(genre => 
                    <Badge pill variant="danger" className="my-1"><div style={{fontSize:11}}>{genre}</div></Badge>
                    )}
                 </Card.Text>
                
                        <Card.Subtitle className="mb-2"><div className="date" style={{fontSize: 14}}>{movie.release_date? movie.release_date.substring(0,4) : '' }</div></Card.Subtitle>
                  <Card.Text><div style={{fontSize: 15}}>{movie.overview}</div></Card.Text>
                  </Card.ImgOverlay>    
              </MDBMask>
            </MDBView>
            <Card.Footer><div style={{fontSize:15}}><span className="text-danger h5">&#9733;</span>{movie.vote_average}</div></Card.Footer>
            <p style={{fontSize:15}}><span className="text-danger">&hearts;</span>{movie.popularity}</p>
          </MDBContainer>
                <a onClick={()=>props.openModal(movie.id)}>Trailer</a>
            </Card>
          
        )
    }); return (

        


        <div className="App App-header container-fluid">
         
            <div className="d-flex flex-wrap main justify-content-center">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                <div className="row">
                {htmlMovieCard}
                </div>
                </div>
                <div className="col-md-2"></div>
                
            </div>
        </div>
    )
   
}

export default MovieCard;