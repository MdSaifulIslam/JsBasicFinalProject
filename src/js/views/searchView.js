import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearReasults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightedSelected = id => {
    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el => {
       el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}

const reduce = title => {
    title = title.substring(0, 20);
    return title + '...';
}

const renderNews = news => {
    const markup = `
    <li>
                    <a class="results__link results__link--active" href="#${news.idDrink}">
                        <figure class="results__fig">
                            <img src="${news.strDrinkThumb}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${reduce(news.strDrink)}.</h4>
                            <p class="results__author">${news.strGlass}</p>
                        </div>
                    </a>
                </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
         </svg>
    </button>
`;

const renderButtons = (page, numResults, newsPerPage) => {
    const pages = Math.ceil(numResults / newsPerPage);
    let button;
    if (page === 1 && pages > 1) {
        //only buttom to nect
        button = createButton(page, 'next');
    } else if (page < pages) {
        //both buttons
        button =   `
         ${createButton(page, 'prev')}
         ${createButton(page, 'next')}
        `;
    }
    else if (page === pages && pages > 1) {
        //only previous button
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (newses, page = 1, newsPerPage = 6) => {
    const start = (page - 1) * newsPerPage;
    const end = page * newsPerPage;

    newses.slice(start, end).forEach(renderNews);

    renderButtons(page, newses.length, newsPerPage);
};

    //newses.forEach(renderNews);
    // const len = Object.keys(newses).length;
    // const pages = len / 7, start = 0, end = 0;

    // let index = 1;

    // start = (index - 1) * 7;
    // end = (index - 1) * 7 + 7;
    // renderNews(newses.slice(2, 4),'start');

    // for (index = 2; index <= pages; index++) {
    //     start = (index - 1) * 7;
    //     end = (index - 1) * 7 + 7;
    //     renderNews(newses.slice(2, 4),'mid');
    // }

    // start = (index - 1) * 7;
    // end = (index - 1) * 7 + 7;
    // renderNews(newses.slice(2, 4),'end');
