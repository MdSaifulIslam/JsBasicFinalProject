import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }


    async getRecipe() {
        try {
            const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`);
            const data = res.data.drinks[0];
            let id = 'strIngredient';
            let pack = Math.ceil(Math.random() * 3);
            let strIngredient = [];
            for (let prop in data) {
                id = prop + '';
                if (id.includes("strIngredient") && data[prop]) {
                    pack = Math.ceil(Math.random() * 3);
                    strIngredient.push(pack + ' pack ' + data[prop]);
                }
            }



            this.title = data.strDrink;
            this.author = data.strCategory;
            this.img = data.strDrinkThumb;
            this.url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`;
            this.ingredients = strIngredient;
        } catch (error) {
            alert(error);
        }
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/1.5);
        this.time = periods * 15;
        
    }

    calcServings(){
        this.servings = 2;
    }

    parseIngredients(){
        const newIngre = this.ingredients.map(el => {
            const arrIng = el.split(' ');
            let objIng;
            objIng = {
                count : parseInt(arrIng[0],10),
                unit : arrIng[1],
                ing :  arrIng [2]
            }
            return objIng;
        });
        this.ingredients  = newIngre;
    }

    updateServings(type){
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        this.ingredients.forEach(ing => {
            console.log('i '+ing.count);
            
            ing.count *= (newServings/this.servings);
            console.log('e '+ing.count);
        });
        this.servings = newServings;
    }
}