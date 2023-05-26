let searchInput = document.querySelector("#searchInput");
let searchButton = document.querySelector("#searchButton");
let recipeContainer = document.querySelector("#recipeContainer");

searchButton.addEventListener("click", function() {
  let query = searchInput.value.trim();

  if (query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(response => response.json())
      .then(data => {
        recipeContainer.innerHTML = '';
        if (data.meals) {
          let meal = data.meals[0];
          let mealName = document.createElement("div");
          mealName.textContent = meal.strMeal;
          mealName.classList.add("recipeName");

          let mealInstructions = document.createElement("div");
          // Replace ". " and ") " with ".\n" and ")\n" to make each step a new line
          let formattedInstructions = meal.strInstructions.replace(/\. /g, ".\n").replace(/\) /g, ")\n");
          mealInstructions.textContent = formattedInstructions;
          mealInstructions.classList.add("recipeInstructions");

          recipeContainer.appendChild(mealName);
          recipeContainer.appendChild(mealInstructions);
        } else {
          recipeContainer.textContent = "No recipes found.";
        }
      })
      .catch(error => {
        console.log(error);
        recipeContainer.textContent = "An error occurred while fetching recipe.";
      });
  }
});
