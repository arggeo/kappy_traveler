const findTopLocations = function(data){

//const locationData = JSON.parse(data);

data.candidates.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

for (let i = 0; i < data.candidates.length; i++) {
    //console.log(data.candidates[i].rating);
}

if (data.candidates.length<10)
    return data;
else
    return data.candidates.slice(0,10);
};


module.exports = findTopLocations;