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

    var createIngredients = function() {
        alert('hi hi add ingredient');
        //add code
    };

    var _getIngredientsHTML = function(recipe) {
        var recipesHTML = "";

        //add code
        return recipesHTML;
    };

    var renderRecipes = function() {
        //empty recipes div
        $recipes.empty();

        for (var i = 0; i < recipes.length; i++) {
            //current recipe in iteration
            var recipe = recipes[i];

            //return HTML for all ingredients
            var ingredients = _getIngredientsHTML(); //add code

            $recipes.append(
                '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' +
                '<h4 class="text-capitalize font-italic text-center">' + recipe.name + '</h4>' +
                '<img class="recipe-img" src="' + recipe.image + '"/>' +
                '<hr>' +
                '<h5 class="font-italic font-bold text-center">ingredients</h5>' +
                '<div class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="add-ingredients input-group-text" id="basic-addon3">Add Ingredients</span>' +
                // '<button class="btn btn-primary add-ingredients input-group-text" type="button" id="basic-addon3">Add Ingredients</button>' +
                '</div>' +
                '<input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">' +
                '</div>' +
                '<ul class="ingredients">' + ingredients + '</ul>' +
                '</div>'
            );
        }
        // add an ingrediente
        $('.row').children(2).children(2).children(7).children(4).closest('#basic-addon3').on('click', function() {
            //debugger;
            console.log($('.row').children(2).children(2));
            console.log($('.row').children(2).children(2).children(6));
            console.log($('.row').children(2).children(2).children(7));
            console.log($('.row').children(2).children(2).children(8));
            //console.log($('.row').children(2).children(2).children(7).children(4).closest("input-group mb-3").find('#basic-addon3'));
            //alert($('.row').children(2).children(2).children(7).children(4).find('#basic-url').val());
            //createIngredients();

        });
    };

    return {
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        createIngredients: createIngredients,
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
// add an ingrediente