import Search from './models/Search';
import { elements, renderLoader,clearLoader } from './views/base';
import * as searchView from './views/searchView';
/**Global state  of the app
 * - search object
 * - current recipe state
 * shopping list object
 * Liked recipes
*/


const state = {};

const controlSearch = async () => {
    // Get query from view
    const query = searchView.getInput();
    console.log(query);
    

    if (query) {
        // New Search object and add to state
        state.search = new Search(query);
        //prepare UI for results
        searchView.clearInput();
        searchView.clearReasults();
        renderLoader(elements.searchRes);

        // search for data
        await state.search.getResults();
        
        clearLoader();
        
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const gotoPage =parseInt(btn.dataset.goto,10);
        searchView.clearReasults();
        searchView.renderResults(state.search.result, gotoPage);
    }
});






/**
 *  this is the api test code
 */

//api key = dc357c9d5c9dbe82ffbae8dc8dce5795f013b313;

//api key = 6aa856acda0b5714153233e8aebeb2e0;

//import axios from 'axios';
// async function getResults(){
//     const url = `http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3bf04716a3b343ee8c75744adb5f7e45`;
//     //const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`;
//     //const url = `https://order-pizza-api.herokuapp.com/api/swagger.json`;
//     const proxy = 'https://cors-anywhere.herokuapp.com/';
//     const key = '3bf04716a3b343ee8c75744adb5f7e45';
//     console.log('hitting');

//     try {
//         //const res = await axios(`${proxy}https://api.edamam.com/search?q=chicken&app_id=2cf8fd6b&app_key=${key}&from=0&to=3&calories=591-722&health=alcohol-free`);
//         const res = await axios(`${url}`);
//         console.log(res.data.articles[1].content);

//     } catch (error) {
//         alert(error);
//     }
// }

// getResults();

/*
Application ID
2cf8fd6b
Application Keys
3d8686150775052ff45845d142cd948e
//const url = `http://newsapi.org/v2/top-headlines?country=${this.country}&category=${this.category}&apiKey=3bf04716a3b343ee8c75744adb5f7e45`;


*/
//"https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
/**
 *  this is the api test code
 */