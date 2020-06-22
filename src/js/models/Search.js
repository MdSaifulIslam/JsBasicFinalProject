import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query[0];
    }
    async  getResults() {
        //const url = `https://newsapi.org/v2/everything?q=${this.query}&apiKey=3bf04716a3b343ee8c75744adb5f7e45`;
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${this.query}`;
            //const url = `https://order-pizza-api.herokuapp.com/api/swagger.json`;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
        try {
            const res = await axios(`${proxy}${url}`);
            this.result = res.data.drinks;
            //this.result = res;



        } catch (error) {
            alert(error);
        }
    }
}