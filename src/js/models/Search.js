import axios from 'axios';
export default class Search {
    constructor(query){
        this.query = query;
    }
    async  getResults() {
        //const url = `https://newsapi.org/v2/everything?q=${this.query}&apiKey=3bf04716a3b343ee8c75744adb5f7e45`;
        const url = `https://newsapi.org/v2/everything?q=${this.query}&apiKey=3bf04716a3b343ee8c75744adb5f7e45`;
        try {
            const res = await axios(`${url}`);
            this.result = res.data.articles;
            
            

        } catch (error) {
            alert(error);
        }
    }
}