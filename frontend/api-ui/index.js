let countryInput = document.querySelector("#countryname");
let responseContainer = document.querySelector('.response table');

//updating the href of the anchor when user types in the input box
countryInput.oninput = function(){
    country.href = "#/countries/"+countryInput.value;
}

//handling routing
let base = "https://countriesnode.herokuapp.com/v1/";
window.addEventListener('load', function() {
    if (!window.location.hash) {
        window.location.hash = '#/home/'
    }
    router(window.location.hash.substring(2))
});
window.addEventListener('hashchange', function(){
    router(window.location.hash.substring(2));
});
let router = function(path){
    path = path.split('/');     //..baseurl../#/path[0]/path[1]/path[2]
    //if the url is ..baseurl../path[0]/
    if(path[0] === ''){
        window.location.hash = '#/home/';
        updateResponse({});
    }
    //if the url is ..baseurl../path[0]/
    else if(path[0] !== '' && path[1] === ''){
        if(path[0] == 'home'){
            updateResponse({});
        }else if(path[0] == 'countries'){
            fetchAndUpdate(base+path[0]+'/')
        }else{
            alert("the url isn't right")
        }
    //if the url is ..baseurl../path[0]/path[1]
    }else if(path[1] !== '' && path[0] == 'countries'){
        fetchAndUpdate(base+path[0]+'/'+path[1]);
    }

}

//updaing the table on hashchange
let updateResponse = function(response){
    if(Object.keys(response).length > 0){
        //generating HTML for the title row
        let columns = Object.keys(response);
        responseText = '<tr class="title">';
        columns.forEach(function(columnName){
            responseText += "<td>" + columnName + "</td>";
        })
        responseText += "</tr>"

        //generating one row of data in each iteration
        for(let i=0; i < response[columns[0]].length; i++){
            responseText += "<tr>";
            columns.forEach(function(columnName){
                responseText += "<td>"+response[columnName][i]+"</td>";
            })
            responseText += "</tr>";
        }
    
        responseContainer.innerHTML = responseText;
    }else{
        //if the hash is #home
        responseContainer.innerHTML = "click on the links above for content"
    }
}


//fetch data and call updateresponse. expects the full path of the endpoint
let fetchAndUpdate = function(path){
    fetch(path)
    .then(function(response){
        return response.json();
    })
    .catch(function(err){
        //not going deep into error handling :(
        alert("error");
        console.log(err);
    })
    .then(function(body){
        path = path.replace(base, '').split('/'); 
        let countryName = [], continent = [], nativeLanguage = [], languages = [];
        if(path[0] === 'countries' && path[1] === ''){
            body.forEach(function(e){
                countryName.push(e.name);
                continent.push(e.continent);
                nativeLanguage.push(e.native);
                languages.push(e.languages);
            })
            updateResponse({
                'CountryName': countryName,
                'Continent':  continent,
                'Native Language': nativeLanguage,
                'Languages': languages
            })
        }else if(path[0] === 'countries' && path[1] !== ''){
            updateResponse({
                'Country Name': [body.name],
                'Currency': [body.currency],
                'Area Code': [body.phone]
            })
        }
    })
}