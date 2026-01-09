const searchbtn = document.getElementById("search-btn");
const clearbtn = document.getElementById("clear-btn")

function clearSearch(){
     document.getElementById('search_bar').value = '';
     document.getElementById('result').innerHTML = '';
     result.style.display = "none";

}
function searchDestination() {
  const input = document.getElementById('search_bar').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

      let results = [];

      if (input === 'beach') {
        results = data.beaches;
      } 
      else if (input === 'temple') {
        results = data.temples;
      } 
      else if (input === 'country') {
        // flatten cities from all countries
        data.countries.forEach(country => {
          results.push(...country.cities);
        });
      }

      if (results.length === 0) {
        resultDiv.innerHTML = 'No recommendations found.';
        return;
      }

      results.forEach(item => {
        resultDiv.innerHTML += `
          <div class="result-card">
            <h2>${item.name}</h2>
            <img src="${item.imageUrl}" alt="${item.name}">
            <p>${item.description}</p>
          </div>
        `;
      });

    })
    .catch(error => {
      console.error(error);
      resultDiv.innerHTML = 'Error fetching data';
    });
}
searchbtn.addEventListener('click',searchDestination)
clearbtn.addEventListener('click',clearSearch)
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
    result.style.display = "block";
});