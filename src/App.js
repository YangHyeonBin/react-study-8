import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]); // 빈 배열
  const [isLoading, setIsLoading] = useState(false); // 로딩 페이지 표시 위한 state
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      } // 이 에러 발생 시, 아래 코드 실행하지 않음, 대신 catch 블록의 코드를 실행

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }; // http 요청으로 받는 데이터와, 원하는 데이터 이름이 다를 때 이런 식으로 변환 가능
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message); // error state를 위에서 정한 에러 메시지(='Something went wrong!')로 변경
    }
    setIsLoading(false); // fetch 제대로 됐을 때도, 에러 발생해 catch 블록 실행됐을 때도 로딩 state는 false로 바꿔줘야 하므로 여기로 위치 변경
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]); // const 호이스팅 문제로 여기로 이동

  let content = <p>Found no moives.</p>;
  
  if (movies.length > 0) {
    content= <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
