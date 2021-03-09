//function to generate random group code for /group/create post request
function generateGroupCode(){

    //set password length/complexity
    let complexity = 7//document.getElementById("slider").value;

    //possible password values
    let values = "ABCDEFGHIJKLMNOPQRSTUVWZYZ1234567890";

    let password = "";

    //create for loop to choose password characters
    for(var i = 0; i <= complexity; i++){
        password = password + values.charAt(Math.floor(Math.random() * Math.floor(values.length - 1)));
    }
    
    //returns generated group code
    return password
}

/**
 * Method used to calculate the averages of people's top artists
 * @param {[track objects]} data, pass array of track objects to calcualte the averages 
 * @returns 
 */
function calculateMusicalProfile (data) {
    let pop = (dnce = nrgy = spch = acst = inst = vale = 0);

    for (x of data){
        pop += x.trackPopularity;
        dnce += x.danceability;
        nrgy += x.energy;
        spch += x.speechiness;
        acst += x.acousticness;
        inst += x.instrumentalness;
        vale += x.valence;
    }

    dataLen = data.length;

    musicalProfile = {
        trackPopularity: pop / dataLen,
        danceability: (dnce / dataLen),
        energy: (nrgy / dataLen),
        speechiness: (spch / dataLen),
        acousticness: (acst / dataLen),
        instrumentalness: (inst / dataLen),
        valence: (vale / dataLen),
      };

    return musicalProfile;
}


//export music profile calculation method
module.exports.calculateMusicalProfile = calculateMusicalProfile;

//export generateGroupCode() as a module for use in Controller.js
module.exports.generateGroupCode = generateGroupCode;