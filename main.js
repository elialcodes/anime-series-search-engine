'use strict';

const inputSearch = document.querySelector('.js-input-search');
const buttonSearch = document.querySelector('.js-button-search');
const buttonReset = document.querySelector('.js-button-reset');
const containerFavorite = document.querySelector('.js-container-favorite');
const containerMain = document.querySelector('.js-container-main');
const noResultParagraph = document.querySelector('.js-no-result');
const cardsSaved = JSON.parse(localStorage.getItem('favorite series'));
let seriesList = [];
let favoriteList = [];

if (cardsSaved !== null) {
  favoriteList = cardsSaved;
  renderFavorite(favoriteList, containerFavorite);
}

function renderSerie(series, container) {
  let content = '';
  for (const serie of series) {
    let imageUrl = serie.images.jpg.image_url;
    if (imageUrl === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
      imageUrl = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    }
    content += `<div id="${serie.mal_id}" class="card-container-main js-card"><span class="title-card">${serie.title}</span><img class="img-card" src="${imageUrl}" alt="anime serie" /></div>`;
  }
  container.innerHTML = content;

  const cards = document.querySelectorAll('.js-card');
  for (const card of cards) {
    card.addEventListener('click', handleAddFavorite);
  }
}

function renderFavorite(series, container) {
  let content = '';
  let index = 0;
  for (const serie of series) {
    let imageUrl = serie.images.jpg.image_url;
    if (imageUrl === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
      imageUrl = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    }
    content += `<div id="${serie.mal_id}" class="card-container-favorite js-favorite-card"><img class="img-favorite-card" src="${imageUrl}" alt="anime serie"/><div class="title-and-remove"><span class="title-favorite-card">${serie.title}</span><button id="${index}" class="remove-button js-remove-button">Eliminar</button></div></div>`;
    index++;
  }
  container.innerHTML = content;

  const removeButtons = document.querySelectorAll('.js-remove-button');
  for (const removeButton of removeButtons) {
    removeButton.addEventListener('click', handleRemoveFavorite);
  }
}

function handleGetApi() {
  const inputSearchValue = inputSearch.value;
  if (inputSearchValue === '') {
    noResultParagraph.innerHTML = '* Por favor, introduce valores válidos para hacer la búsqueda.';
  } else {
    noResultParagraph.innerHTML = '';
    fetch(`https://api.jikan.moe/v4/anime?q=${inputSearchValue}`)
      .then((response) => response.json())
      .then((data) => {
        seriesList = data.data;
        renderSerie(seriesList, containerMain);
      })

      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}

buttonSearch.addEventListener('click', handleGetApi);

function handleAddFavorite(event) {
  const selectedCardId = parseInt(event.currentTarget.id);
  const selectedCard = seriesList.find((serie) => serie.mal_id === selectedCardId);
  const indexFavoriteCards = favoriteList.findIndex((favoriteItem) => {
    return favoriteItem.mal_id === selectedCardId;
  });
  if (indexFavoriteCards === -1) {
    favoriteList.push(selectedCard);
  }
  event.currentTarget.classList.add('favorite-card');
  renderFavorite(favoriteList, containerFavorite);
  localStorage.setItem('favorite series', JSON.stringify(favoriteList));
}

function handleRemoveFavorite(event) {
  const index = event.target.id;
  favoriteList.splice(index, 1);
  let cardsLocalStorage = JSON.parse(localStorage.getItem('favorite series'));
  cardsLocalStorage.splice(index, 1);
  localStorage.setItem('favorite series', JSON.stringify(cardsLocalStorage));
  renderFavorite(favoriteList, containerFavorite);
}

function handleReset() {
  inputSearch.value = '';
  seriesList = [];
  favoriteList = [];
  containerFavorite.innerHTML = '';
  containerMain.innerHTML = '';
  noResultParagraph.innerHTML = '';
}

buttonReset.addEventListener('click', handleReset);
