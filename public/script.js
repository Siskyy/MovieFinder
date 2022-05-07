const tmdbKey = '54e6c7d0807d204199521ac57e97ec9d';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

    try {
        // send request
        const response = await fetch(urlToFetch);
        // handles response if successful
        if (response.ok) {
            const jsonResponse = await response.json();
            let genres = jsonResponse.genres;
            console.log(genres);
            return genres;
        }
    } catch (error) {
        console.log(error);
    };
};


const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        
        if (response.ok) {
            const jsonResponse = await response.json();
            let movies = jsonResponse.results;
            console.log("These are the movie results:")
            console.log(movies);
            return movies;
        }
    } catch (error) {
        console.log(error);
    };
};


const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    console.log("Movie ID is: ");
    console.log(movieId);
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`

    try {
        const response = await fetch(urlToFetch);

        if (response.ok) {
            const jsonResponse = await response.json();
            let movieInfo = jsonResponse;
            
            return movieInfo;
        }

    } catch (error) {
        console.log(error);
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  console.log("Getting random movie selection ...");
  console.log(movies);
  const randomMovie = getRandomMovie(movies);
  console.log("The random Movie is: ");
  console.log(randomMovie);
  const info = await getMovieInfo(randomMovie);
  console.log("The movie info: ");
  console.log(info);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;