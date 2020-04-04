import React from 'react'
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Badge } from 'react-bootstrap';
import '../App.css'

let API_KEY = process.env.REACT_APP_APIKEY;

export default function Genres(props) {
    const searchByGenre = async (genreID) => {
        props.setSelectedGenre(genreID);
        console.log('genreID', genreID);
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreID}&page=1`
        let res = await fetch(url);
        let data = await res.json();
        console.log('search by genres:', data);
        props.setMoviePage(data);
        props.setActivePage(1);
        props.setMovies(data.results);
    }

    return props.genres===undefined? <div>Genres</div>: props.genres.map(genre => (
        
            <Badge key={genre.id} pill style={{border: "1px solid #b3b3b3"}} className="m-1 genre-select"
                onClick={()=>searchByGenre(genre.id)} tabindex="-1" >
                {genre.name}
                </Badge>      
        
    ))
}
