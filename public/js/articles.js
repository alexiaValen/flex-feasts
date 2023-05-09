const artcilesBtn = document.querySelector('.articles-btn');
const articlesDisplay = document.querySelector('#articles');
const articlesUrl = 'https://flex-feasts.herokuapp.com/api/artciles';

//https://https://flex-feasts.herokuapp.com/artciles
fetch(articlesUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(resource => {
            const resourceItem = 
            `<h2 class="scrapedTitle">` + resource.title + `</h2><br><a class="scrapedLink" href="` + resource.url + `">` + resource.url + `</a><br>`
            articlesDisplay.insertAdjacentHTML("beforeEnd", resourceItem)
    });
}).catch(err => console.log(err))