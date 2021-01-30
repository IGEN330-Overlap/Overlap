//function to generate random group code for /group/create post request
function generate(){

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

//export generate() as a module for use in Controller.js
module.exports.generate = generate();