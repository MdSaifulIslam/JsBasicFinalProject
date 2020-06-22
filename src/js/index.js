import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
/**Global state  of the app
 * - search object
 * - current recipe state
 * shopping list object
 * Liked recipes
*/


const state = {};


/**
 * search controller
 */

const controlSearch = async () => {
    // Get query from view
    const query = searchView.getInput();

    if (query) {
        // New Search object and add to state
        state.search = new Search(query);
        //prepare UI for results
        searchView.clearInput();
        searchView.clearReasults();
        renderLoader(elements.searchRes);

        // search for data
        try {
            await state.search.getResults();
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert(error);
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearReasults();
        searchView.renderResults(state.search.result, gotoPage);
    }
});

/**
 * recipe controller
 */
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if (id) {
        //prepare uI for change
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        if(state.search) searchView.highlightedSelected(id);
        //create new recipe object
        state.recipe = new Recipe(id);
        try {
            //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );
        } catch (error) {
            alert(error);
        }

    }

};


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/**
 * List controller
 */
const controlList = () => {
    if(!state.list)
        state.list = new List();
        state.recipe.ingredients.forEach(el =>{
            const item = state.list.addItem(el.count, el.unit, el.ing);
            listView.renderItem(item);
        });
}

/**
 * Like controller
 */

const controlLike = () =>{
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    if(!state.likes.isLiked(currentID)){
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );  

        likesView.toggleLiked(true);

        likesView.renderLikes(newLike);

    }else{
        state.likes.deleteLike(currentID);

        likesView.toggleLiked(false);
        likesView.deleteLike(currentID);

    }
    likesView.toggleMenu(state.likes.getNunLikes());
}



elements.shopping.addEventListener('click', e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }else if(e.target.matches('.shopping_count--value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
    
});

//Restore liked
window.addEventListener('load' , () =>{
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleMenu(state.likes.getNunLikes());
    state.likes.likes.forEach(like => likesView.renderLikes(like));
});


elements.recipe.addEventListener('click', e=> {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        //decrease buttom clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngre(state.recipe);
        }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        //increase button clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngre(state.recipe);
    }
    else if(e.target.matches('.recipe_btn--add, .recipe_btn--add *')){
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});