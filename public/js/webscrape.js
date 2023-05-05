const artcilesBtn = document.querySelector('.articles-btn');
const articlesDisplay = document.querySelector('#articles');
const workoutDisplay = document.querySelector('#workouts');
const articlesUrl = 'http://localhost:3001/api/articles';
const workoutUrl = 'http://localhost:3001/api/workouts';


//https://https://flex-feasts.herokuapp.com/artciles
fetch(articlesUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(resource => {
            const resourceItem = 
            `<h2 class="title">` + resource.title + `</h2><br><a href="` + resource.url + `">` + resource.url + `</a><br>`
            articlesDisplay.insertAdjacentHTML("beforeEnd", resourceItem)
    });
}).catch(err => console.log(err))

fetch(workoutUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(resource => {
            const resourceItem = 
            `<h2 class="title">` + resource.title + `</h2><br><a href="` + resource.url + `">` + resource.url + `</a><br>`
            workoutDisplay.insertAdjacentHTML("beforeEnd", resourceItem)
    });
}).catch(err => console.log(err))