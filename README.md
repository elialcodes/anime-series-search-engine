# Anime Series Search 📺 :dart: :fire: :kr:

The web aplication consists of a search engine for anime series like Naruto, One Piece, Dragon Ball... all your favorite series!
The web has a basic structure with a search input for series/characters, a search button, a reset button, a favorite series container and a main series container for user search results. The design is responsive according to a "mobile first" approach and from there we took care with other devices.


## Features ⭐

- search for series from a value entered in the input
- data request to the server with fetch through API (asynchrony)
- render the information obtained in cards in the "main" container
- select the cards and add them to the "favorites" container
- add the cards with their information in localStorage, so when reloading the page they are displayed by default


## Extras :1st_place_medal:

- add a class to highlight that the card is in the favorites container
- remove the cards from the favorites container with an individual button for each card or with a global button that removes them all
- both delete buttons make the series also disappear from the localStorage
- a reset button that restores the initial state of the page: no list of favorites and no list of search results.


## Tech Stack 💻 📚

HTML, CSS and JavaScript


## API Reference

#### Get all items

```http
  https://api.jikan.moe/v4/anime
```

## 🔗 Links

https://elialcodes.github.io/anime-series-search-engine/
