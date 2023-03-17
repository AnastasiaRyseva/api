class View {
    constructor() {
        this.app = document.getElementById('app');

        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Search repositories';

        this.searchLine = this.createElement('div', 'search-line');
        this.searchInput = this.createElement('input', 'search-input');
        this.searchCounter = this.createElement('span', 'counter');
        this.searchBtn = this.createElement('button', 'search-btn');
        this.searchBtn.innerHTML = 'Get it!';

        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchBtn);
        this.searchLine.append(this.searchCounter);

        this.wrapper = this.createElement('div', 'wrapper');
        this.list = this.createElement('ul', 'list');
        this.wrapper.append(this.list);
        this.main = this.createElement('div', 'main');
        this.main.append(this.wrapper);
        this.app.append(this.title);
        this.app.append(this.searchLine);
        this.app.append(this.main);
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if(elementClass) {
            element.classList.add(elementClass);
        }
        return element
    }

    createRepo (element) {
        const elem = this.createElement('li', 'repo');
        elem.innerHTML = `<a href="${element.html_url}" target="_blank">
                            ${element.name}</a>
                            <span> ${element.language ? element.language + ' основной язык проекта' : ''}</span>
                        `
        this.list.append(elem)
    }
}

const GITHUB_PER_PAGE = 10;

class Search {
    setCurrentPage(pageNum) {
        this.currentPage = pageNum;

    }
    constructor(view) {
        this.view = view;

        // this.view.searchInput.addEventListener('keyup', this.load.bind(this))
        this.view.searchBtn.addEventListener('click', this.load.bind(this))
        this.currentPage = 1;
    }

    async load() {
        return await fetch(`https://api.github.com/search/repositories?q=${this.view.searchInput.value}&per_page=${GITHUB_PER_PAGE}&page=${this.currentPage}`)
        .then(res => {
            if(res.ok) {
                this.setCurrentPage(this.currentPage + 1);
                res.json().then(res => {
                    if(res.items.length == 0) {
                        this.view.searchCounter.innerHTML = 'Нет результатов, возможна ошибка ввода'
                    }
                    res.items.forEach(element => this.view.createRepo(element));
                })
            } else {
                console.log('Error 1' + response.status);
            }
        })
    }    
}

new Search(new View);