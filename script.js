var RecipeApp = function() {
    var recipesData = {
        recipes: []
            // { 
            //     id: 1,
            //     name: 'Best Chicken Soup!', 
            //     image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
            //     ingredients: [
            //         { name: 'whole chicken' },
            //         { name: 'medium carrots'},
            //         { name: 'onions' },
            //     ] 
            // }]
    };

    var $recipes = $('.recipes');
    //id's for recipes
    var recId = 2;
    //id's for ingredients
    var ingId = 0;

    var source = $("#store-template").html();
    var template = Handlebars.compile(source);

    var createRecipe = function(name, image) {
        var recipe = {
            name: name,
            image: image,
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId++;

        recipesData.recipes.push(recipe);
    };

    var _findRecipIndexById = function(recID) {
        for (i in recipesData.recipes) {
            if (recipesData.recipes[i].id == recID) {
                return i
            }
        }
        return undefined;
    }

    var createIngredients = function(text, id) {
        var ingrediente = {
            name: text
        };
        let index = _findRecipIndexById(id);
        let recipe = this.recipesData.recipes[index];
        console.log(recipe);
        recipe.ingredients.push(ingrediente);
        //add code
    };

    var _getIngredientsHTML = function(recipe) {
        var recipesHTML = "";
        for (let ingrediente of recipe.ingredients) {
            recipesHTML = recipesHTML + '<li>' + ingrediente.name + '</li>';
        }
        //add code
        return recipesHTML;
    };

    var deleteRecipe = function(recId) {
        console.log(recId);
        let index = _findRecipIndexById(recId);
        this.recipesData.recipes.splice(index, 1);
    }

    var renderRecipes = function() {
        $recipes.empty();
        var newHTML = template(this.recipesData);
        $recipes.append(newHTML);

        // //empty recipes div
        // $recipes.empty();
        // var newHTML = template();
        // $recipes.html(newHTML)

    }


    return {
        recipesData: recipesData,
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