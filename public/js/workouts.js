const workoutDisplay = document.querySelector('#workouts');
const workoutUrl = 'https://flex-feasts.herokuapp.com/api/workouts';

fetch(workoutUrl)
.then(response => response.json())
.then(data => {
    data.forEach(resource => {
        const resourceItem = 
        `<h2 class="scrapedTitle">` + resource.title + `</h2><br><a class="scrapedLink" href="` + resource.url + `">` + resource.url + `</a><br>`
        workoutDisplay.insertAdjacentHTML("beforeEnd", resourceItem)
});
}).catch(err => console.log(err))