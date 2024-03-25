const apiURL = "https://api.themoviedb.org/3/movie/550?api_key=f5a98fce500b642afc3a76c9a8774abb"; 

fetch(apiURL)
.then(response => {
    if(!response.ok){
        throw new Error("Error"); 
    }

    return response.json(); 
})
.then(data => {
    console.log('Datos:', data); 
})
