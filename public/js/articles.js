const articlesDisplay = document.querySelector('#articles');
const articlesUrl = 'https://flex-feasts.herokuapp.com/api/articles';//http://localhost:3001/api/articles

fetch(articlesUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(resource => {
            const resourceItem = 
            `<div class="card ">
            <h2 class="scrapedTitle">` + resource.title + `</h2>
            <button type="button" class="btn btn-secondary">
            <a class="scrapedLink" href="` + resource.url + `">Find Out More</a>
            </button><br><br><br></div>`
            articlesDisplay.insertAdjacentHTML("beforeEnd", resourceItem)
    });
}).catch(err => console.log(err))