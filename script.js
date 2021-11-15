// Functions
function searchMovieByName(name){
    fetch('movies.txt')
    .then((response) =>{
          return response.json();
    })
    .then((data)=>{
        data.forEach((elem)=>{
            if(JSON.stringify(elem).indexOf(name) != -1)
            console.log(elem.Title);
        })
    })

}

function searchMovieByGrade(grade){
        fetch('movies.txt')
        .then((response)=>{
          return response.json();
        })
        .then((data)=>{
            data.forEach((element)=>{
                let rotten_T_rating = element['Rotten Tomatoes Rating'] / 10;
                let IMDB_rating = element['IMDB Rating'];
                // Logic
                     if(rotten_T_rating != null && IMDB_rating != null){
                        if(rotten_T_rating > grade) 
                                console.log(element.Title + ", Roten Tomatoes: " + rotten_T_rating);
                        if (IMDB_rating > grade)
                                console.log(element.Title + ", IMDB rating: " + IMDB_rating);
                        }else if(rotten_T_rating != null ){
                                if(rotten_T_rating > grade)
                                console.log(element.Title + ", Roten Tomatoes: " + rotten_T_rating);
                        }else if(IMDB_rating != null){
                            if (IMDB_rating > grade)
                            console.log(element.Title + ", IMDB rating: " + IMDB_rating);    
                        }else{
                            console.log(element.Title + ", No grade !");
                        } 
            })
      
        })
        
    }
//  sort function
function sortFloats(arr,num){
    let output = [];
    let index = 0 ;
    while(num > 0){ 
         let max = arr[0];
       for(let i = 1 ; i < arr.length; i++){
            if( arr[i] > max){
                max = arr[i];
                index = i ;
            }  
       }
                output.push({  "value" : Math.round(max) ,
                                "movie_index":index
                            });
                           
                            arr.splice(index, 1);
                num--;
    }
    
    return output;
}

function maxVotes(){
            fetch("movies.txt")
            .then((response)=>{
                if(response.status == 200)
                  return  response.json();
                else
                Promise.reject(new Error("Error",response));
            })
            .then((data)=>{
                const votes = data.map((vote)=> vote ['IMDB Rating']* vote['IMDB Votes'])
               // console.log(votes);
          let values =    sortFloats(votes,5);
             for(let i = 0 ; i < values.length; i++)
                    console.log(data[values[i].movie_index])
            })
           
}

function maxProfit(){
    fetch("movies.txt")
    .then((response)=>{
        if(response.status == 200)
          return  response.json();
     else
        Promise.reject(new Error("Error",response));
    })
    .then((data)=>{
        const profit = data.map((p)=> p ['Production Budget'] -  p['Worldwide Gross'])
       // console.log(votes);
        let values =    sortFloats(profit,5);
     for(let i = 0 ; i < values.length; i++)
            console.log(data[values[i].movie_index])
    })
}

function betweenYears(down,up){
        fetch("movies.txt")
        .then((response)=>{
          return response.json();
        })
        .then((data)=>{
                    data.forEach((movie)=>{
                            let movie_release_year = new Date(movie["Release Date"]).getFullYear();
                                if(movie_release_year >= down && movie_release_year <= up)
                                    console.log(movie);
                    })
     
        })
    }
 //Calling functions

        // searchMovieByName("Godfather");
        //searchMovieByGrade(9.8);
        // maxVotes();
        //maxProfit();
       // betweenYears(2010,2011)


