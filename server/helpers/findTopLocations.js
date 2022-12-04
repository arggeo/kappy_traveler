const findTopLocations = function(data){

if(data.length>0){
    data.sort((a, b) => parseFloat(b.avgRating) - parseFloat(a.avgRating));
    //console.log(data);

    for (let i = 0; i < data.length; i++) {
        //console.log(data[i].rating);
    }

    if (data.length<10)
        return data;
    else
        return data.slice(0,10);
};
}


module.exports = findTopLocations;