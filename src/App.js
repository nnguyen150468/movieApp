import React, {useEffect, useState} from 'react';
import './App.css';
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
import MovieCard from './components/MovieCard'
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Header from './components/Header';
import ReactModal from 'react-modal';
import YouTube from '@u-wave/react-youtube'


let API_KEY = '26c6dfbd83ff3e3d65592404e691361e';
let keyword = '';

function App() {
  let [movies, setMovies] = useState([]);

  let [movieList, setMovieList] = useState([]) //keep original movie list

  let [genres, setGenres] = useState([]);

  let [moviePage, setMoviePage] = useState({});

  let [modal, setModal] = useState(false);

  let [trailer, setTrailer] = useState('');

  let [sortingKey, setSortingKey] = useState('');

  let [wayToFindData, setWayToFindData] = useState('');

  let CurrentPlaying = async () => {
    console.log('currently playing')
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    let response = await fetch(url);
    let data = await response.json();
    setMovieList(data.results);
    setMoviePage(data);
    setMovies(data.results);
    console.log('movies:', data.results);
    let GenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    let GenreResponse = await fetch(GenreUrl)
    let genreListObject = await GenreResponse.json();
    setGenres(genreListObject.genres);
  }

  useEffect(CurrentPlaying,[]);
  

  let [key, setKey] = useState('now_playing')
  let PlayNowOrTopRated = async (key) => {
    setKey(key);
    setActivePage(1);
    let url = `https://api.themoviedb.org/3/movie/${key}?api_key=${API_KEY}&language=en-US&page=1`
    let response = await fetch(url);
    let data = await response.json();
    console.log('top rated data:', data);
    setMovies(data.results)
  }

  let searchByKeyWord = async (e) => {
    keyword = e.target.value;
    if(keyword === ''){
      setMovies(movieList);
    } else {
      setMovies(movies.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase())));
      // let url = `https://api.themoviedb.org/3/search/keyword?query=${keyword}&api_key=${API_KEY}&language=en-US&page=${page}`
      // let response = await fetch(url);
      // let data = await response.json();
      // let dataObject = data.results;
      // console.log('data searched by keyword:', dataObject);
    }
  }

  let [ratingValue, setRatingValue] = useState({min:0, max: 10});
  let ratingSliderChange = (newValue) => {
    setRatingValue(newValue);
    console.log('rating value:', newValue);
    console.log('movieList:', movieList)
    // console.log('value.min & max', newValue.value.min, newValue.value.max)
    let filteredMovies = movieList.filter(movie => {
       return movie.vote_average >= newValue.min && movie.vote_average <= newValue.max;
    });
    console.log('filtered Movies:', filteredMovies)
    setMovies(filteredMovies);
  }

  let mostToLeast = (key) => {
    if(!movies){
      setMovies(movieList);
    } else {
      let mostToLeast = [...movies].sort((a,b)=>b[key] - a[key]);
      setActivePage(1);
      setMovies(mostToLeast);
      console.log('most to least',mostToLeast);
    }
  }

  let leastToMost = (key) => {
    if(!movies){
      setMovies(movieList);
    } else {
      let leastToMost = [...movies].sort((a,b)=>a[key]-b[key]);
      setActivePage(1);
      setMovies(leastToMost);
    }
  }

  let sortMovies = async () => {
    setActivePage(1);
    setWayToFindData('discover/')
    console.log('sortingKey:',sortingKey);
    let url = `https://api.themoviedb.org/3/${wayToFindData}/movie?sort_by=${sortingKey}&api_key=${API_KEY}&language=en-US&page=${page}`
    let response = await fetch(url);
    let data = await response.json();
    setMovies(data.results)
    console.log('sorted results:', data.results)
  }

  let openModal = async (movieID) => {
    let url = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`;
    let response = await fetch(url);
    let data = await response.json();
    console.log('hehe data video:', data)
    setTrailer(data.results.length>0 ? data.results[0].key : 'uKLSQPhERnU')
    setModal(true);
  }

  // pagination
  let [page, setActivePage] = useState(1);
  let handlePageChange = async (pageNumber)=> {
    setActivePage(pageNumber);
    console.log(`active page is ${pageNumber}`);
    console.log('key current is:', key);
    let url = ''
    if(wayToFindData==="discover/"){
      url = `https://api.themoviedb.org/3/${wayToFindData}movie?sort_by=${sortingKey}&api_key=${API_KEY}&language=en-US&page=${pageNumber}`
    } else if(wayToFindData===''){
      url = `https://api.themoviedb.org/3/movie/?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
    }
    let response = await fetch(url);
    let data = await response.json();
    console.log('top rated data:', data);
    setMovies(data.results)
  }
  
   return (
    <div className="App">
              <Navbar className="nguyen-navbar fixed-top" expand="lg">
          <Navbar.Brand href="#home"><img border="0" height="40px" src="https://fontmeme.com/permalink/200322/c759b45177dedb749000426d3db679bd.png" alt="Nguyen2"></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home" style={{color: "white"}} onClick={()=>PlayNowOrTopRated('now_playing')}>Currently Playing</Nav.Link>
              <Nav.Link href="#link" style={{color: "white"}} onClick={()=>PlayNowOrTopRated('top_rated')}>Top Rated</Nav.Link>
              <NavDropdown title={<span className="text-white">Sort</span>} className="text-danger" id="basic-nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}
                <NavDropdown.Item className="bg-dark" href="#action/3.2"><a className="text-white" onClick={()=>sortMovies(setSortingKey('popularity.desc'))}>Most To Least Popular</a></NavDropdown.Item>
                <NavDropdown.Item className="bg-dark" href="#action/3.3"><a className="text-white" onClick={()=>sortMovies(setSortingKey('popularity.asc'))}>Least To Most Popular</a></NavDropdown.Item>
                <NavDropdown.Divider bg="dark" />
                <NavDropdown.Item className="bg-dark" href="#action/3.4"><a className="text-white" onClick={()=>sortMovies(setSortingKey('vote_average.desc'))}>Highest to Lowest Rating</a></NavDropdown.Item>
                <NavDropdown.Item className="bg-dark" href="#action/3.5"><a className="text-white" onClick={()=>sortMovies(setSortingKey('vote_average.asc'))}>Lowest to Highest Rating</a></NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" onChange={(e)=>{searchByKeyWord(e)}} placeholder="Search" className="mr-sm-2" />
            </Form>
          </Navbar.Collapse>
        </Navbar>

     <div>
     <Header/>
     </div>

      <div className="range col-md-5 mx-auto mt-5 container-fluid text-white">
      <InputRange
        maxValue={10}
        minValue={0}
        value={ratingValue}
        onChange={(value)=>ratingSliderChange(value)}/>
        Rating
      </div>   

      <MovieCard movieList={movies} genreList={genres} openModal={openModal}/>
        <div className="text-white d-flex justify-content-center mt-5">
      <ReactModal
        isOpen={modal}
        style={{ overlay: {display:"flex",justifyContent:"center"}, content: {width:"70%",height:"70%", position:"relative"} }}
        onRequestClose={()=>setModal(false)}>
          <YouTube video={trailer} autoplay className="video"/>
        </ReactModal>
      


      <Pagination
      className="pagination text-danger bg-danger"
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
