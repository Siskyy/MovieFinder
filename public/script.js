const tmdbKey = '54e6c7d0807d204199521ac57e97ec9d';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

    try {
        // send request
        const response = await fetch(`${urlToFetch}`);
        // handles response if successful
        if (response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse;
            console.log(genres);
            return genres;
        }
    } catch (error) {
        console.log(error);
    };
};

const getMovies = () => {
    const selectedGenre = getSelectedGenre();
};

const getMovieInfo = () => {

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;