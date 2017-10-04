$(document).ready(function() {

// Array of initial Celebrities
var celebrityArray = ['miley cyrus', 'joe jonas', 'will smith', ' johnny depp'];

//////////////// Start of Functions //////////////

// Self Executing Function that loops through the array and prints outs various buttons
function buttons(){
    console.log("Button function is being called");
    // Clears existing buttons everytime function is called
    $(".center_Button").empty();
    // For Loop to add buttons based on existing Array
    for (var index = 0; index < celebrityArray.length; index++){
      // Declare variable button to store button element
      var button = $("<button>");
      // Add class to button variable
      button.addClass("btn btn-primary btn_Name");
      // Add unique attribute to button variable so as to be able to identify the button
      button.attr('data-name', celebrityArray[index]);
      // Add's Text to the button
      button.text(celebrityArray[index]);
      // Add CSS to spread buttons out and a random background-color to each button
      var color = '#' + (Math.random().toString(16) + "000000").substring(2,8);
      button.css({"margin": "10px", "background-color": color, "mix-blend-mode": "difference", " text-shadow" : "2px 2px 4px black"});
      // Add the buttons to center_Button Row
      $(".center_Button").append(button);
    };
    // Adds a on click event to the button that calls back display function
    $(".btn_Name").on("click", display);
};
// End of button function //

// Function for Displaying gifs
function display(){
    console.log("Display Function is being called");
    // Clear previous displayed images
    $(".content_GIFS").empty();
    // Declare celebrity variable to store attribute "data-name" from the button that is being clicked
    var celebrity = $(this).attr("data-name");
    // Declare a url that concatenates a string with the celebrity name and api key that limits 10 results
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebrity + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Ajax call to access GIF API. Passed guqeryURL and Get as parameters
    $.ajax({url: queryURL, method: "GET"}).done(function(response) {
        console.log(response); // Object
        // Use for loop to create 10 pictures based on the length of the array in the response object. 10 results.
        for (var i = 0; i < response.data.length; i++) {
            // Declare celebrityDiv variable to store div element and assign bootstrap class
            var celebrityDiv = $("<div>").addClass("col-xs-12 col-sm-6 col-md-4 col-lg-3 celeb_Border");
            // CSS to Spread out the images and Change text color
            celebrityDiv.css({"margin-top": "25px", "color": "white"});
            // Declare p variable and assign p tage to it.
            var p = $("<p>");
            // Center the p tag
            p.css({"text-align": "center", "text-shadow" : "2px 2px 4px black", "padding": "5px"});
            // Add text and rating from response
            p.text("Rating: " + response.data[i].rating);
            // Devlare variable celebrityImage to store IMG tag along with image source
            var celebrityImage = $("<img>").attr("src", response.data[i].images.fixed_height.url);
            // Style the image tag
            celebrityImage.css({"margin": "0 auto 5px auto", "padding-top": "5px"});
            // Add bootstrap image responsive class to make the image responsive
            celebrityImage.addClass("img img-responsive");
            //Add still and animate attributes that contains the url for still and moving images
            celebrityImage.attr("data-animate", response.data[i].images.fixed_height.url);
            celebrityImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            // Set the initial data-state to animate
            celebrityImage.attr("data-state", "animate");
            // Prepend the p variable to celebrityDiv
            celebrityDiv.prepend(p);
            // Append celebrityImage to celebrityDiv
            celebrityDiv.append(celebrityImage);
            // Add the entire gif contents to the content_GIFS row
            $(".content_GIFS").append(celebrityDiv);

            // Add an event listner to celebrityImage that switches animated and still images when clicked
            $(celebrityImage).on("click", function(){
                // Declare a state variable to store the current state of the image. Current State is Animate
                var state = $(this).attr('data-state');
                // Conditional statement toggle between animate and still
                if (state === "still") {
                   // Set the image source to "data-animate"
                   $(this).attr("src", $(this).attr("data-animate"));
                   // Set "data-state" to animate
                   $(this).attr("data-state", "animate");

                } else {
                   // Set the image source to "data-still"
                   $(this).attr("src", $(this).attr("data-still"));
                   // Set "data-state" to still
                   $(this).attr("data-state", "still");
               }; // End of Condition
           }); // End of On Click
       }; // End of For loop
   }); // End of AJAX call
};
// End of Function for Displaying gifs //

//////////////////////////////////////////////////


// Event Listner//
// Add Button to Add a Celebritiy
$(".submit").on("click", function(){
    console.log("Submit is being called");
    // Declare variable celebrityName to store input of text box
    var celebrityName = $(".name").val();
    // Push the input string into the array celebrityArray
    celebrityArray.push(celebrityName);
    // Call the buttons function to rebuilt the buttons based on the current array
    buttons();
    // Clear the input text box
    $(".name").val(" ");
}); // End of Add button listner
// End of Event Listner //

// Execute buttons function when program runs to display the the various buttons
buttons();

// End of Doc Ready//
});
