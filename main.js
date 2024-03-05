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
  renderSerie(favoriteList, containerFavorite);
}

function renderSerie(series, container) {
  let content = '';
  for (const serie of series) {
    let imageUrl = serie.images.jpg.image_url;
    if (imageUrl === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
      imageUrl = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    }
    content += `<div id="${serie.mal_id}" class="card js-card"><span class="title-card">${serie.title}</span><img class="img-card" src="${imageUrl}" alt="" /></div>`;
  }
  container.innerHTML = content;

  const cards = document.querySelectorAll('.js-card');
  for (const card of cards) {
    card.addEventListener('click', handleAddFavorite);
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
        console.log(data.data);
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
  renderSerie(favoriteList, containerFavorite);
  localStorage.setItem('favorite series', JSON.stringify(favoriteList));
}

function handleReset() {
  inputSearch.value = '';
  containerFavorite.innerHTML = '';
  containerMain.innerHTML = '';
  noResultParagraph.innerHTML = '';
}

buttonReset.addEventListener('click', handleReset);
