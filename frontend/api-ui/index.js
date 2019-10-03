//let countries = document.querySelector('#countries');
//let country = document.querySelector('#country');
let countryInput = document.querySelector("#countryname");
let responseContainer = document.querySelector('.response table');

//helper func
//adds the provided function to all matching classname/tagname
let eventAdder = function(selector, event, func){
    document.querySelectorAll(selector).forEach(function(elem){
        elem.addEventListener(event, func);
    })
}

countryInput.oninput = function(){
    country.href = "/countries/"+countryInput.value;
    country.innerHTML = "/countries/"+countryInput.value;
}

eventAdder( 'a', 'click', function(e){
    e.preventDefault();
    let path = e.target.href.replace(e.target.baseURI, '');
    console.log(path);
    fetch(base+path)
    .then(function(response){
        return response.json();
    })
    .then(function(body){
        let code = path.replace('countries/', '');
        if(code === ''){
            let countries = [];
            body.forEach(function(e){
                countries.push(e.name);
            })
            updateResponse({'countryNames': countries})
            console.log(countries);
        }else if(code !== ''){
            let country;
            body.forEach(function(e){
                if(e.code == code){
                    country = e;
                } 
            })
            console.log(code);
            console.log(country);
        }
    })
})

//here response is the json obj
let updateResponse = function(response){
    let columns = Object.keys(response);
    responseText = '<tr class="title">';
    columns.forEach(function(columnName){
        responseText += "<td>" + columnName + "</td>";
    })
    responseText += "</tr>"
    console.log(response[columns[0]].length)
    for(let i=0; i < response[columns[0]].length -1; i++){
        responseText += "<tr>";
        columns.forEach(function(columnName){
            responseText += "<td>"+response[columnName][i]+"</td>"  ;
        })
        responseText += "</tr>";
    }

    responseContainer.innerHTML = responseText;
}

let base = "https://countriesnode.herokuapp.com/v1/";

let fetcher = function(path){
    
}