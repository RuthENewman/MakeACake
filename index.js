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
  const singleCakeDiv = document.querySelector('cake');
}

function getDesserts() {
  cakesDiv.innerHTML = '<p class="loadingMessage">Loading cakes...</p>';
  fetch(dessertURL)
    .then(response => response.json())
    .then(desserts => {
      cakesDiv.innerHTML = '';
      state.desserts = desserts.meals;
      state.desserts.forEach(dessert => addADessert(dessert))
    })
}

function searchForRecipe(dessertID) {
  fetch(`${dessertbyIDBaseURL}${dessertID}`)
    .then(response => response.json())
    .then(dessert => {
      recipe = dessert.meals[0].strInstructions;
      video = dessert.meals[0].strYoutube;
      video_code = video.split('=')[1];
      youtube_url = `https://www.youtube.com/embed/${video_code}`;
      cuisine = dessert.meals[0].strArea;
      name = dessert.meals[0].strMeal;
      thumbnail = dessert.meals[0].strMealThumb;
      cakeButtonDiv.style.display = 'none';
      cakesDiv.innerHTML = `
      <div class="fullCakeRecipe">
        <div class="cakeTitle"><p>${name}</p></div>
        <div class="cuisine"><p>${cuisine}</p></div>
        <iframe
        class="youtubeDemonstration"
        width="560"
        height="315"
        src=${youtube_url}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
        <div class="cakeInstructions">
          <h3 class="heading">Recipe instructions</h3>
          <p>${recipe}</p>
        </div>
        <div class="backToHome">Go back to all desserts</div>
      </div>`;
      const backToHomeButton = document.querySelector('.backToHome');
      backToHomeButton.addEventListener('click', getDesserts);
    })

}

function addADessert(dessert) {
  cakesDiv.innerHTML += `<div
  class="cake" data-id="${dessert.idMeal}">
     <div class="cakeName"><p>${dessert.strMeal}</p></div>
     <img src=${dessert.strMealThumb} alt=${dessert.strMeal} class="cakeThumbnail"/>
      </div>`;
  const allCakeDivs = document.querySelectorAll('.cake');
  allCakeDivs.forEach(singleCakeDiv => singleCakeDiv.addEventListener('click', function() {
    searchForRecipe(singleCakeDiv.dataset.id)
}));
}

getDesserts();
