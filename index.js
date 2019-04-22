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
      let selectedDessert = dessert.meals[0]
      let recipe = selectedDessert.strInstructions;
      let video = selectedDessert.strYoutube;
      let video_code = video.split('=')[1];
      let youtube_url = `https://www.youtube.com/embed/${video_code}`;
      let cuisine = selectedDessert.strArea;
      let name = selectedDessert.strMeal;
      let thumbnail = selectedDessert.strMealThumb;
      cakeButtonDiv.style.display = 'none';
      console.log(dessert);
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
        <div class="ingredients">
          <h3 class="heading">Recipe ingredients</h3>
          <p id="ingredient1">${selectedDessert.strMeasure1} ${selectedDessert.strIngredient1}</p>
          <p id="ingredient2">${selectedDessert.strMeasure2} ${selectedDessert.strIngredient2}</p>
          <p id="ingredient3">${selectedDessert.strMeasure3} ${selectedDessert.strIngredient3}</p>
          <p id="ingredient4">${selectedDessert.strMeasure4} ${selectedDessert.strIngredient4}</p>
          <p id="ingredient5">${selectedDessert.strMeasure5} ${selectedDessert.strIngredient5}</p>
          <p id="ingredient6">${selectedDessert.strMeasure6} ${selectedDessert.strIngredient6}</p>
          <p id="ingredient7">${selectedDessert.strMeasure7} ${selectedDessert.strIngredient7}</p>
          <p id="ingredient8">${selectedDessert.strMeasure8} ${selectedDessert.strIngredient8}</p>
          <p id="ingredient9">${selectedDessert.strMeasure9} ${selectedDessert.strIngredient9}</p>
          <p id="ingredient10">${selectedDessert.strMeasure10} ${selectedDessert.strIngredient10}</p>
          <p id="ingredient10">${selectedDessert.strMeasure11} ${selectedDessert.strIngredient11}</p>
          <p id="ingredient12">${selectedDessert.strMeasure12} ${selectedDessert.strIngredient12}</p>
          <p id="ingredient13">${selectedDessert.strMeasure13} ${selectedDessert.strIngredient13}</p>
          <p id="ingredient14">${selectedDessert.strMeasure14} ${selectedDessert.strIngredient14}</p>
          <p id="ingredient15">${selectedDessert.strMeasure15} ${selectedDessert.strIngredient15}</p>
        </div>
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
