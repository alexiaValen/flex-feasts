const workoutDisplay = document.querySelector('#workouts');
const workoutUrl = 'https://flex-feasts.herokuapp.com/api/workouts';//http://localhost:3001/api/workouts

fetch(workoutUrl)
.then(response => response.json())
.then(data => {
    data.forEach(resource => {
        const resourceItem = 
        `<div class="card">
        <h2 class="scrapedTitle">` + resource.title + `</h2>
        <button type="button" class="btn btn-secondary">
        <a class="scrapedLink" href="` + resource.url + `">Find Out More
        </button></a><br><br><br></div>`
        workoutDisplay.insertAdjacentHTML("beforeEnd", resourceItem)
});console.log(data)
}).catch(err => console.log(err))