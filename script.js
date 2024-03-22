// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const favourites = document.getElementById('favourites');
const movieDetails = document.getElementById('movieDetails');


// loading movies list on loading of the movie page.
window.onload = async function() {
    const data =  await fetchMovieDetails();
    console.log(data)
    renderMovieList(data);
};


// Event Listener for search form submission
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') return;

  // Fetch movie search results from API
  const searchResultsData = await fetchSearchResults(searchTerm);
  renderSearchResults(searchResultsData);
});

// Function to fetch movie search results from API
async function fetchSearchResults(searchTerm) {

  const apiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=1e5c31fa";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    return [];
  }
}

// Function to render movie search results
function renderSearchResults(results) {
  console.log(results);
  if (!results || results.length === 0) {
    searchResults.innerHTML = '<p>No results found</p>';
    return;
  }

  searchResults.innerHTML = '';
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.innerHTML = `
      <h2>${results.Title}</h2>
      <img src="${results.Poster}" alt="${results.Title} Poster">
      <p>${results.Year}</p>
      <button class="add-to-favourites" data-imdbid="${results.imdbID}">Add to Favourites</button>
    `;
    searchResults.appendChild(movieItem);
}

// Event delegation for add to favourites button clicks
searchResults.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-favourites')) {
    const imdbID = event.target.dataset.imdbid;
    //const movieDetails = fetchMovieDetails(imdbID);
  }
});

// Function to fetch movie details by IMDb ID
async function fetchMovieDetails() {

  const apiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=1e5c31fa";
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    return null;
  }
}

// display the movie list on movie page
function renderMovieList(results) {
  if (!results || results.length === 0) {
    movieDetails.innerHTML = '<p>No results found</p>';
    return;
  }

  movieDetails.innerHTML = '';
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.innerHTML = `
      <h2>${results.Title}</h2>
      <img src="${results.Poster}" alt="${results.Title} Poster">
      <p>${results.Year}</p>
      <button class="add-to-favourites" data-imdbid="${results.imdbID}">Add to Favourites</button>
    `;
    movieDetails.appendChild(movieItem);
}

// Function to add movie to favourites
function addMovieToFavourites(movieDetails) {
  const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
  favouritesList.push(movieDetails);
  localStorage.setItem('favourites', JSON.stringify(favouritesList));
  renderFavourites();
}

// Function to remove movie from favourites
function removeMovieFromFavourites(imdbID) {
  let favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
  favouritesList = favouritesList.filter(movie => movie.imdbID !== imdbID);
  localStorage.setItem('favourites', JSON.stringify(favouritesList));
  renderFavourites();
}

// Function to render favourites list
function renderFavourites() {
  const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
  favouriteList.innerHTML = '';
  favouritesList.forEach(movie => {
    const favouriteItem = document.createElement('div');
    favouriteItem.classList.add('favourite-item');
    favouriteItem.innerHTML = `
      <h2>${movie.Title}</h2>
      <button class="remove-from-favourites" data-imdbid="${movie.imdbID}">Remove from Favourites</button>
    `;
    favouriteList.appendChild(favouriteItem);
  });
}

// Event delegation for remove from favourites button clicks
favourites.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-from-favourites')) {
    const imdbID = event.target.dataset.imdbid;
    removeMovieFromFavourites(imdbID);
  }
});

// Initial rendering of favourites list
renderFavourites();
