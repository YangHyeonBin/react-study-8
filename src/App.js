import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]); // 빈 배열

  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/').then(response => { // reponse는 요청 응답 데이터 담긴 객체
      return response.json(); // response(=Promise?) 객체의 내장 메소드, json 형태 데이터 -> JS object
    }).then(data => {
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }; // http 요청으로 받는 데이터와, 원하는 데이터 이름이 다를 때 이런 식으로 변환 가능
      });
      setMovies(transformedMovies);
    });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>  
  );
}

export default App;
