'use strict';

const inputSearch = document.querySelector('.js-input-search');
const buttonSearch = document.querySelector('.js-button-search');
const containerFavorite = document.querySelector('.js-container-favorite');
const containerMain = document.querySelector('.js-container-main');
let seriesList = [];
let seriesFavoriteList = [];

function renderSerie(seriesArray) {
  let content = '';
  for (const serie of seriesArray) {
    // if (serie.image.jpg.image_url === 'null') {
    //   serie.image.jpg.image_url = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    // }
    content += `<div class="card"><span class="title-card">${serie.title}</span><img class="img" src="${serie.images.jpg.image_url}" alt="" /></div>`;
  }
  containerMain.innerHTML = content;
}

function handleGetApi() {
  const inputSearchValue = inputSearch.value;
  console.log(inputSearchValue);

  fetch(`https://api.jikan.moe/v4/anime?q=${inputSearchValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      seriesList = data.data;
      renderSerie(seriesList);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

buttonSearch.addEventListener('click', handleGetApi);
