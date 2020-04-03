import React, {useEffect, useState} from 'react';
import MovieCard from './components/MovieCard'
import NavbarComp from './components/NavbarComp'
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Header from './components/Header';
import ReactModal from 'react-modal';
import YouTube from '@u-wave/react-youtube'
import './App.css';

let API_KEY = process.env.REACT_APP_APIKEY;
let keyword = '';


function App() {
  let [movies, setMovies] = useState([]);

  let [movieList, setMovieList] = useState([]) //keep original movie list

  let [genres, setGenres] = useState([]);

  let [moviePage, setMoviePage] = useState({});

  let [modal, setModal] = useState(false);

  let [trailer, setTrailer] = useState('');

  let CurrentPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    let response = await fetch(url);
    let data = await response.json();
    setMovieList(data.results);
    setMoviePage(data);
    setMovies(data.results);
    console.log('data:',data)
    console.log('movies:', data.results);
    let GenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    let GenreResponse = await fetch(GenreUrl)
    let genreListObject = await GenreResponse.json();
    console.log('genreListObject',genreListObject.genres)
    setGenres(genreListObject.genres);
  }

  useEffect(()=> {
    CurrentPlaying();
  }, [])  

  let [key, setKey] = useState('now_playing')
  let PlayNowOrTopRated = async (key) => {
    page=1;
    setActivePage(1);
    setKey(key);
    console.log('page:', page)
    let url = `https://api.themoviedb.org/3/movie/${key}?api_key=${API_KEY}&language=en-US&page=${page}`
    let response = await fetch(url);
    let data = await response.json();
    console.log('top rated data:', data);
    setMovies(data.results)
    setRatingValue({min:0, max: 10});
  }

  let searchByKeyWord = async (keyword) => {
    if(keyword === ''){
      setMovies(movieList);
    } else {
      setMovies(movies.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase())));
      // let url = `https://api.themoviedb.org/3/search/keyword?query=${keyword}&api_key=${API_KEY}&language=en-US&page=${page}`
      // let response = await fetch(url);
      // let data = await response.json();
      // let dataObject = data.results;
      // console.log('data searched by keyword:', dataObject);
      // setMovies(data.results);
    }
  }

  let [ratingValue, setRatingValue] = useState({min:0, max: 10});
  let ratingSliderChange = (newValue) => {
    setRatingValue(newValue);
    console.log('rating value:', ratingValue);
    console.log('movieList:', movieList)
    // console.log('value.min & max', ratingValue.value.min, ratingValue.value.max)
    let filteredMovies = movies.filter(movie => {
       return movie.vote_average >= ratingValue.min && movie.vote_average <= ratingValue.max;
    });
    console.log('filtered Movies:', filteredMovies)
    setMovies(filteredMovies);
  }

  let mostToLeast = (key) => {
    if(!movies){
      setMovies(movieList);
    } else {
      let mostToLeast = [...movies].sort((a,b)=>b[key] - a[key])
      setMovies(mostToLeast);
      console.log('most to least',mostToLeast);
    }
  }

  let leastToMost = (key) => {
    if(!movies){
      setMovies(movieList);
    } else {
      let leastToMost = [...movies].sort((a,b)=>a[key]-b[key])
      setMovies(leastToMost);
    }
  }

  let openModal = async (movieID) => {
    let url = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`;
    let response = await fetch(url);
    let data = await response.json();
    console.log('hehe data video:', data)
    setTrailer(data.results.length>0? data.results[0].key: 'uKLSQPhERnU');
    setModal(true);
  }

  // pagination
  let [page, setActivePage] = useState(1);
  let handlePageChange = async (pageNumber)=> {
    setActivePage(pageNumber);
    console.log(`active page is ${pageNumber}`);
    console.log('key current is:', key);
    let url = `https://api.themoviedb.org/3/movie/${key}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
    let response = await fetch(url);
    let data = await response.json();
    console.log('top rated data:', data);
    setMovies(data.results)
  }
  
   return (
    <div className="App">
          <NavbarComp PlayNowOrTopRated={PlayNowOrTopRated} mostToLeast={mostToLeast} 
          leastToMost={leastToMost} searchByKeyWord={searchByKeyWord} />
     <div>
     <Header/>
     </div>

      <div className="range col-md-5 col-sm-12 mx-md-auto mt-5 container-fluid text-white">
      <InputRange
        maxValue={10}
        minValue={0}
        value={ratingValue}
        onChange={(value)=>ratingSliderChange(value)}/>
        Rating
      </div>   

      <MovieCard movies={movies} genreList={genres} openModal={openModal}/>
        <div className="text-white d-flex justify-content-center mt-5">
      <ReactModal
        isOpen={modal}
        style={{ overlay: {display:"flex",justifyContent:"center",backgroundClip:"green"}, content: { width:"70%",height:"70%", position:"relative", margin:"auto"} }}
        onRequestClose={()=>setModal(false)}>
        <YouTube video={trailer} autoplay className="video"/>
      </ReactModal>


      <Pagination className="pagination m-5 p-5"
      prevPageText='prev'
      nextPageText='next'
      firstPageText='first'
      lastPageText='last'
      activePage={page}
      itemsCountPerPage={20}
      totalItemsCount={moviePage.total_results}
      onChange={(pageNumber)=>handlePageChange(pageNumber)}
      itemClass="page-item"
      linkClass="page-link"
      />

        </div>
    
    </div>
  );
}

export default App;
