

var myHttp = new XMLHttpRequest();
var myHttp2 = new XMLHttpRequest();
var movieTrend = document.getElementById("movieTrend")
var tvTrend = document.getElementById("tvTrend")
var allData = []
var allDataTV = []

// var URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=37ad0d2ce704bc4b3b5b52c50d50c62f"
// var URLTV = "https://api.themoviedb.org/3/trending/tv/day?api_key=37ad0d2ce704bc4b3b5b52c50d50c62f"

myHttp.open("GET",URLFormate("movie"))
myHttp2.open("GET",URLFormate("tv"))

myHttp.send();
myHttp2.send();

myHttp.onreadystatechange = function(){
    if(myHttp.readyState == 4 && myHttp.status == 200){
        var myData = JSON.parse(myHttp.response)
        allData = myData.results.splice(0,7)
        displayData(allData,"movies") // and here data = allData type = movies
        
    }
}


myHttp2.onreadystatechange = function(){
    if(myHttp2.readyState == 4 && myHttp2.status == 200){
        var myData = JSON.parse(myHttp2.response)
        allDataTV = myData.results.splice(0,7)
        displayData(allDataTV,"tv") // and here i said data = allDataTV and type = tv
        // console.log(allData);
    }
}


function displayData(data,type){   // i gave the function two parameters one the data two the type 
    var cartona = `<div class=" col-md-3">
    <h2>Trending ${type}</h2>
</div>`;

    for(var i = 0 ; i < data.length ; i++){
        
        cartona += `
        <div class=" col-md-3 item">
        <div class = "item">
        <img class=" w-100" src="https://image.tmdb.org/t/p/w500${data[i].poster_path}">
            <h2>${type == "tv" ? data[i].name : data[i].title}</h2>   
            <p>${data[i].overview.split("").splice(0, 50).join("")}...</p> 
            <span class = "rating">${data[i].vote_average}</span>
        </div>
        </div>`
        //.split and splice and join so all the p will be the same size (only 50 words)
    }
      // because movies = title and tv = name we did in line 47 a if that says (if type = tv put data.name else put data.title)


    if(type == "tv"){                 //here i did a if condition so when its tv the innerHTML will go to tvTrend 
        tvTrend.innerHTML = cartona
    }else{                              // else will go to moviesTrend
        movieTrend.innerHTML = cartona
    }
    
}

function URLFormate(type){    // عمنا دا بدل اننا نقعد نكتب اتنين (url) 
    return `https://api.themoviedb.org/3/trending/${type}/day?api_key=37ad0d2ce704bc4b3b5b52c50d50c62f`
}


