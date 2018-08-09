var RecipeApp = function() {

    var recipes = [
        // { 
        //     id: 1,
        //     name: 'Best Chicken Soup!', 
        //     image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
        //     ingredients: [
        //         { name: 'whole chicken' },
        //         { name: 'medium carrots'},
        //         { name: 'onions' },
        //     ] 
        // }
    ];

    var $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 0;

    var createRecipe = function(name, image) {
        var recipe = {
            name: name,
            image: image,
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId++;

        recipes.push(recipe);
    };

    var _findRecipIndexById = function(recID) {
        for (i in recipes) {
            if (recipes[i].id == recID) {
                return i
            }
        }
        return undefined;
    }

    var createIngredients = function(text, id) {
        var ingrediente = {
            text: text
        };
        let index = _findRecipIndexById(id);
        let recipe = this.recipes[index];
        console.log(recipe);
        recipe.ingredients.push({ text: text });
        //add code
    };

    var _getIngredientsHTML = function(recipe) {
        var recipesHTML = "";
        for (let ingrediente of recipe.ingredients) {
            recipesHTML = recipesHTML + '<li>' + ingrediente.text + '</li>';
        }
        //add code
        return recipesHTML;
    };

    var deleteRecipe = function(recId) {
        console.log(recId);
        let index = _findRecipIndexById(recId);
        this.recipes.splice(index, 1);
    }

    var renderRecipes = function() {
        //empty recipes div
        $recipes.empty();

        for (var i = 0; i < recipes.length; i++) {
            //current recipe in iteration
            var recipe = recipes[i];

            //return HTML for all ingredients
            var ingredients = _getIngredientsHTML(recipe); //add code

            $recipes.append(
                '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' +
                '<h4 class="text-capitalize font-italic text-center">' + recipe.name + '</h4>' +
                '<img class="recipe-img" src="' + recipe.image + '"/>' +
                '<hr>' +
                '<h5 class="font-italic font-bold text-center">ingredients</h5>' +
                '<div class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="add-ingredients input-group-text" id="basic-addon3">Add Ingredients</span>' +
                '</div>' +
                '<input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">' +
                '<button class="btn btn-primary delete-recipe" type="button">Delete a Recipe</button>' + '</div>' +
                '<ul class="ingredients">' + ingredients + '</ul>' +
                '</div>'
            );
        }


    };

    return {
        recipes: recipes,
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        createIngredients: createIngredients,
        deleteRecipe: deleteRecipe
    }
};

var app = RecipeApp();


//--------EVENTS

//add a recipe
$('.add-recipe').on('click', function() {
    //collect input text
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();

    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});

$('.recipes').on('click', '.delete-recipe', function() {
    let recId = $(this).closest('.recipe').attr("data-id");
    app.deleteRecipe(recId);
    app.renderRecipes();
});

// add an ingrediente
$('.recipes').on('click', '.add-ingredients', function() {
    let text = $(this).closest('.input-group').find('#basic-url').val();
    let recId = $(this).closest('.recipe').attr("data-id");
    app.createIngredients(text, recId)
    app.renderRecipes();

});