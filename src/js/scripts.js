const searchBtn = document.querySelector('.search-btn');
const recipeList = document.querySelector('.recipes-list');

searchBtn.addEventListener('click', getMealList);

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
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="image of the meal">
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