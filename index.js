const proxyCORS = "https://cors-anywhere.herokuapp.com/";

const dessertURL = `${proxyCORS}https://themealdb.com/api/json/v1/1/filter.php?c=Desert`;
const dessertbyIDBaseURL = `${proxyCORS}https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;

const cakesDiv = document.querySelector('.cakes')
const cakeButtonDiv = document.querySelector('.cakeButton');

const state = {
  desserts: [],
}


function initialize() {
  getDesserts()
    .then(desserts => {
      cakesDiv.innerHTML = '';
      state.desserts = desserts;
      state.desserts.forEach(dessert => addADesert(dessert))
    })
}

function getDesserts() {
  cakesDiv.innerHTML = '<p class="loadingMessage">Loading cakes...</p>';
  fetch(dessertURL)
    .then(response => response.json())
    .then(desserts => {
      cakesDiv.innerHTML = '';
      state.desserts = desserts.meals;
      console.log(state.desserts);
      state.desserts.forEach(dessert => addADessert(dessert))
    })
}

function getDessertByID(dessertID) {
  fetch(`${dessertbyIDBaseURL}${dessertID}`)
    .then(response => response.json())
    .then(data => {
      dessertByID = {...data};
      recipe = data[0].strinstructions;
      video = data[0].strYoutube;
      cuisine = data[0].strarea;
    })
    return dessertByID;
}

function addADessert(dessert) {
  cakesDiv.innerHTML += `<div
  class="cake">
     <div data-id=${dessert.idMeal} class="cakeName"><p>${dessert.strMeal}</p></div>
     <img src=${dessert.strMealThumb} alt=${dessert.strMeal} class="cakeThumbnail"/>
      </div>`;
}

getDesserts();
