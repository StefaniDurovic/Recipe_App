const searchBtn = document.querySelector('.search-btn');
const recipeList = document.querySelector('.recipes-list');
const input = document.querySelector('input');
const recipeBtn = document.querySelector('.card-btn');
const recipeModalContent = document.querySelector('.modal-content');

// search event listeners
searchBtn.addEventListener('click', getMealList);
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      getMealList();
    }
  });

// trigger recipe details event listener
recipeList.addEventListener('click', getRecipe);


// create meal cards that contain input ingredients
function getMealList() {
    let searchTerm = document.querySelector('input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if (data.meals) {
            html = `<h2>Here are your search results:</h2>`;
            data.meals.forEach(meal => {
                html += `
                <div class="card col-lg-4" data-id="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="image of ${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <button class="btn card-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">To the recipe!</button>
                    </div>
                </div>
            `;
        });
    } else {
        html = "Sorry, we currently have no meals with your desired ingredient!";
    }

    recipeList.innerHTML = html;

    });
}


// get meal recipe
function getRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('card-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => recipeModal(data.meals));
    }
}


// create recipe modal
function recipeModal(meal) {
    meal = meal[0];
    let html = `
        <div class="modal-header border-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-header border-0">
            <h1 class="modal-title fs-3" id="exampleModalLabel">${meal.strMeal}</h1>
        </div>
        <div class="modal-body">
            <h4 class="instructions-word text-center">Instructions:</h4>
            <p class="text-center">${meal.strInstructions}</p>
            <img class="modal-img" src="${meal.strMealThumb}" alt="picture of ${meal.strMeal}">
        </div>
        <div class="modal-footer border-0">
            <a href="${meal.strYoutube}" target="_blank" class="btn modal-link">Watch video</a>
        </div>
    `;
    recipeModalContent.innerHTML = html;
}