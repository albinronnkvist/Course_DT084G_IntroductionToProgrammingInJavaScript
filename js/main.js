/*
JavaScript - Projektuppgift
Description: Working with AJAX and Arbetsförmedlingens open API to dynamically post content on the webpage "af.htm".
Author: Albin Rönnkvist
*/



/*
Elements
*/
// Get element "mainnavlist"
var mainnavlistEL = document.getElementById('mainnavlist');
// Get element "searchlan"
var searchlanEl = document.getElementById('searchlan');
// Get element "info"
var infoEl = document.getElementById('info');
// Get element "numrows"
var numrowsEl = document.getElementById("numrows");
// Get element "onlyit"
var onlyitEl = document.getElementById("onlyit");
// Get element "searchlan"
var searchlanEl = document.getElementById("searchlan");
// Get element "searchText"
var searchTextEl = document.getElementById("searchText");
// Get element "searchbutton"
var searchbuttonEl = document.getElementById("searchbutton");
// Get element "logo"
var logoEl = document.getElementById("logo");



/*
Main URL(The API)
*/
var mainURL = "https://api.arbetsformedlingen.se/af/v0";



/*
API calls
*/
// ONLOAD: Function to load in menus from API
function onload() { 

    // Load JSON data with AJAX-request
    var xhr = new XMLHttpRequest(); // Create XMLHttpRequest object

    xhr.onload = function() { // When response has loaded
        if(xhr.readyState == 4 && xhr.status === 200) { // If server status was ok the entire content has been recieved

            infoEl.innerHTML = "<p>Välj ett län i någon av menyerna och filtrera platsannonser med sökfältet.</p>";

            var jsonData = JSON.parse(xhr.responseText); // responseText returns the entire JSON file as a string. JSON.parse()-method parses the JSON-string, constructing the JavaScript value or object described by the string.
            
            // Build up a string with new content
            for (var i = 0; i < jsonData.soklista.sokdata.length; i++) { // Loop through object
                mainnavlistEL.innerHTML += "<li id='"+jsonData.soklista.sokdata[i].id+"'>"+jsonData.soklista.sokdata[i].namn+" (" + jsonData.soklista.sokdata[i].antal_ledigajobb + ")</li>";
                searchlanEl.innerHTML += "<option value='"+jsonData.soklista.sokdata[i].id+"'>"+jsonData.soklista.sokdata[i].namn+"</option>";
       
            }
        }
    };

    xhr.open('GET', mainURL+"/platsannonser/soklista/lan", true); // Prepare the request
    xhr.send(); // Send the request
}
// document: load in the menus when the page has finished loading. 
document.addEventListener("DOMContentLoaded", onload, false);



//
// onlyitChange(): if onlyitEl is checked, change it's value to 3 which is the id for IT-jobs in the API. Otherwise leave it empty to show all jobs. 
onlyitEl.value = "";
function onlyitChange(e) {
    if (e.target.checked) {
        onlyitEl.value = "3";
    } else {
        onlyitEl.value = "";
    }

    // Load JSON data with AJAX-request
    var xhr = new XMLHttpRequest();

    xhr.onload = function() { // When response has loaded
        if(xhr.readyState == 4 && xhr.status === 200) { //if server status was ok

            infoEl.innerHTML = "";
            // Print the name of chosen län
            infoEl.innerHTML += "<h2>" + searchlanEl.options[searchlanEl.selectedIndex].text + "</h2>";

            // Get JSON-string and parse it to an object
            var jsonData = JSON.parse(xhr.responseText);

            // Add new content
            for (var i = 0; i < jsonData.matchningslista.matchningdata.length; i++) { // Loop through object
                infoEl.innerHTML += "<article>";
                infoEl.innerHTML += "<h3>" + jsonData.matchningslista.matchningdata[i].annonsrubrik + "</h3>"
                infoEl.innerHTML += "<h4>" + jsonData.matchningslista.matchningdata[i].yrkesbenamning + ", " + jsonData.matchningslista.matchningdata[i].arbetsplatsnamn + ", " + jsonData.matchningslista.matchningdata[i].kommunnamn + "</h4>"
                infoEl.innerHTML += "<p>";
                infoEl.innerHTML += "<strong>Antal platser: </strong>" + jsonData.matchningslista.matchningdata[i].antalplatser + "<br>";
                infoEl.innerHTML += "<strong>Publiceringsdatum: </strong>" + jsonData.matchningslista.matchningdata[i].publiceraddatum.substring(0,10);
                infoEl.innerHTML += "</p>";
                infoEl.innerHTML += "<p><a href='"+jsonData.matchningslista.matchningdata[i].annonsurl+"' target='_blank' class='btn btn-primary'>Läs Mer</a></p>";
                infoEl.innerHTML += "</article>";
            }

        }
        // If something went wrong - inform the user
        else if (xmlhttp.status == 400) {
            alert('There was an error 400');
        }
        else {
            alert('something else other than 200 was returned');
        }

    };

    xhr.open('GET', mainURL+"/platsannonser/matchning?lanid=" + searchlanEl.value + "&antalrader=" + numrowsEl.value + "&yrkesomradeid=" + onlyitEl.value, true);
    xhr.send();
}
// onlyitEl: if the checkbox value is changed(checked/not checked), run the onlyitChange()-function
onlyitEl.addEventListener("change", onlyitChange, false);



//
// numrowsChange(): change the number of articles being loaded in based on the value of numrowsEl.
numrowsEl.value = "20";
function numrowsChange(e) {
    if (e.target.value >= 1) {
        numrowsEl.value = e.target.value;
    }
    else {
        infoEl.innerHTML = "<h3 style='color: #cc0000'>Fel vid inläsning</h3><p>'Max antal' måste vara högre än 0!</p>";
    }

    // Load JSON data with AJAX-request
    var xhr = new XMLHttpRequest();

    xhr.onload = function() { // When response has loaded
        if(xhr.readyState == 4 && xhr.status === 200) { //if server status was ok

            infoEl.innerHTML = "";
            // Print the name of chosen län
            infoEl.innerHTML += "<h2>" + searchlanEl.options[searchlanEl.selectedIndex].text + "</h2>";

            // Get JSON-string and parse it to an object
            var jsonData = JSON.parse(xhr.responseText); 

            // Add new content
            for (var i = 0; i < jsonData.matchningslista.matchningdata.length; i++) { // Loop through object
                infoEl.innerHTML += "<article>";
                infoEl.innerHTML += "<h3>" + jsonData.matchningslista.matchningdata[i].annonsrubrik + "</h3>"
                infoEl.innerHTML += "<h4>" + jsonData.matchningslista.matchningdata[i].yrkesbenamning + ", " + jsonData.matchningslista.matchningdata[i].arbetsplatsnamn + ", " + jsonData.matchningslista.matchningdata[i].kommunnamn + "</h4>"
                infoEl.innerHTML += "<p>";
                infoEl.innerHTML += "<strong>Antal platser: </strong>" + jsonData.matchningslista.matchningdata[i].antalplatser + "<br>";
                infoEl.innerHTML += "<strong>Publiceringsdatum: </strong>" + jsonData.matchningslista.matchningdata[i].publiceraddatum.substring(0,10);
                infoEl.innerHTML += "</p>";
                infoEl.innerHTML += "<p><a href='"+jsonData.matchningslista.matchningdata[i].annonsurl+"' target='_blank' class='btn btn-primary'>Läs Mer</a></p>";
                infoEl.innerHTML += "</article>";
            }

        }
        // If something went wrong - inform the user
        else if (xmlhttp.status == 400) {
            alert('There was an error 400');
        }
        else {
            alert('something else other than 200 was returned');
        }

    };

    xhr.open('GET', mainURL+"/platsannonser/matchning?lanid=" + searchlanEl.value + "&antalrader=" + numrowsEl.value + "&yrkesomradeid=" + onlyitEl.value, true);
    xhr.send();
}
// numrowsEl: when the <input type=number>-element is changed, run the numrowsChange()-function.
numrowsEl.addEventListener("change", numrowsChange, false);



//
// mainnavlistContent(): load in articles from chosen "län" in mainnavlistEl to infoEl
function mainnavlistContent(e) {

    // Load JSON data with AJAX-request
    var xhr = new XMLHttpRequest();

    xhr.onload = function() { // When response has loaded
        if(xhr.readyState == 4 && xhr.status === 200) { //if server status was ok

            infoEl.innerHTML = "";
            // Print the name of chosen län
            infoEl.innerHTML += "<h2>" + searchlanEl.options[searchlanEl.selectedIndex].text + "</h2>";

            // Get JSON-string and parse it to an object
            var jsonData = JSON.parse(xhr.responseText);

            // Add new content
            for (var i = 0; i < jsonData.matchningslista.matchningdata.length; i++) { // Loop through object
                infoEl.innerHTML += "<article>";
                infoEl.innerHTML += "<h3>" + jsonData.matchningslista.matchningdata[i].annonsrubrik + "</h3>"
                infoEl.innerHTML += "<h4>" + jsonData.matchningslista.matchningdata[i].yrkesbenamning + ", " + jsonData.matchningslista.matchningdata[i].arbetsplatsnamn + ", " + jsonData.matchningslista.matchningdata[i].kommunnamn + "</h4>"
                infoEl.innerHTML += "<p>";
                infoEl.innerHTML += "<strong>Antal platser: </strong>" + jsonData.matchningslista.matchningdata[i].antalplatser + "<br>";
                infoEl.innerHTML += "<strong>Publiceringsdatum: </strong>" + jsonData.matchningslista.matchningdata[i].publiceraddatum.substring(0,10);
                infoEl.innerHTML += "</p>";
                infoEl.innerHTML += "<p><a href='"+jsonData.matchningslista.matchningdata[i].annonsurl+"' target='_blank' class='btn btn-primary'>Läs Mer</a></p>";
                infoEl.innerHTML += "</article>";
            }

        }
        // If something went wrong - inform the user
        else if (xmlhttp.status == 400) {
            alert('There was an error 400');
        }
        else {
            alert('something else other than 200 was returned');
        }

    };

    xhr.open('GET', mainURL+"/platsannonser/matchning?lanid=" + e.target.id + "&antalrader=" + numrowsEl.value + "&yrkesomradeid=" + onlyitEl.value, true);
    xhr.send();
    // Change län value in <select>-menu so it's the same as the clicked län in the left menu.
    searchlanEl.value = e.target.id;
}
// mainnavlistEl: when a <li>-element is clicked inside the <ul>-menu "mainnavlistEl", run the function mainnavlistContent().
mainnavlistEL.addEventListener("click", mainnavlistContent, false);



//
// searchlanContent(): load in articles from chosen "län" in searchlanEl to infoEl
function searchlanContent() {

    // Load JSON data with AJAX-request
    var xhr = new XMLHttpRequest();

    xhr.onload = function() { // When response has loaded
        if(xhr.readyState == 4 && xhr.status === 200) { //if server status was ok

            infoEl.innerHTML = "";
            // Print the name ff chosen län
            infoEl.innerHTML += "<h2>" + searchlanEl.options[searchlanEl.selectedIndex].text + "</h2>";

            // Get JSON-string and parse it to an object
            var jsonData = JSON.parse(xhr.responseText);

            // Add new content
            for (var i = 0; i < jsonData.matchningslista.matchningdata.length; i++) { // Loop through object
                infoEl.innerHTML += "<article>";
                infoEl.innerHTML += "<h3>" + jsonData.matchningslista.matchningdata[i].annonsrubrik + "</h3>"
                infoEl.innerHTML += "<h4>" + jsonData.matchningslista.matchningdata[i].yrkesbenamning + ", " + jsonData.matchningslista.matchningdata[i].arbetsplatsnamn + ", " + jsonData.matchningslista.matchningdata[i].kommunnamn + "</h4>"
                infoEl.innerHTML += "<p>";
                infoEl.innerHTML += "<strong>Antal platser: </strong>" + jsonData.matchningslista.matchningdata[i].antalplatser + "<br>";
                infoEl.innerHTML += "<strong>Publiceringsdatum: </strong>" + jsonData.matchningslista.matchningdata[i].publiceraddatum.substring(0,10);
                infoEl.innerHTML += "</p>";
                infoEl.innerHTML += "<p><a href='"+jsonData.matchningslista.matchningdata[i].annonsurl+"' target='_blank' class='btn btn-primary'>Läs Mer</a></p>";
                infoEl.innerHTML += "</article>";
            }

        }
        // If something went wrong - inform the user
        else if (xmlhttp.status == 400) {
            alert('There was an error 400');
        }
        else {
            alert('something else other than 200 was returned');
        }

    };

    xhr.open('GET', mainURL+"/platsannonser/matchning?lanid=" + searchlanEl.value + "&antalrader=" + numrowsEl.value + "&yrkesomradeid=" + onlyitEl.value, true);
    xhr.send();
}
// searchlanEl: when the select-menu option is changed, run the searchlanContent()-function.
searchlanEl.addEventListener("change", searchlanContent, false);



//
// search(): load in articles that match the searchstring in the variable "searchTextEl".
function search() {

    // Load JSON data with AJAX-request
    var xhr = new XMLHttpRequest();

    xhr.onload = function() { // When response has loaded
        if(xhr.readyState == 4 && xhr.status === 200) { //if server status was ok

            infoEl.innerHTML = "";
            // Print the name of chosen län
            infoEl.innerHTML += "<h2>" + searchlanEl.options[searchlanEl.selectedIndex].text + "</h2>";

            // Searchstring
            if (searchTextEl.value === "") {
                infoEl.innerHTML += "";
            } else {
                infoEl.innerHTML += "<p>" + "<b>Visar resultat för:</b> " + searchTextEl.value;
            }


            // Get JSON-string and parse it to an object
            var jsonData = JSON.parse(xhr.responseText);

            // Add new content
            for (var i = 0; i < jsonData.matchningslista.matchningdata.length; i++) { // Loop through object
                infoEl.innerHTML += "<article>";
                infoEl.innerHTML += "<h3>" + jsonData.matchningslista.matchningdata[i].annonsrubrik + "</h3>"
                infoEl.innerHTML += "<h4>" + jsonData.matchningslista.matchningdata[i].yrkesbenamning + ", " + jsonData.matchningslista.matchningdata[i].arbetsplatsnamn + ", " + jsonData.matchningslista.matchningdata[i].kommunnamn + "</h4>"
                infoEl.innerHTML += "<p>";
                infoEl.innerHTML += "<strong>Antal platser: </strong>" + jsonData.matchningslista.matchningdata[i].antalplatser + "<br>";
                infoEl.innerHTML += "<strong>Publiceringsdatum: </strong>" + jsonData.matchningslista.matchningdata[i].publiceraddatum.substring(0,10);
                infoEl.innerHTML += "</p>";
                infoEl.innerHTML += "<p><a href='"+jsonData.matchningslista.matchningdata[i].annonsurl+"' target='_blank' class='btn btn-primary'>Läs Mer</a></p>";
                infoEl.innerHTML += "</article>";
            }

        }
        // If something went wrong - inform the user
        else if (xmlhttp.status == 400) {
            alert('There was an error 400');
        }
        else {
            alert('something else other than 200 was returned');
        }

    };

    xhr.open('GET', mainURL+"/platsannonser/matchning?lanid=" + searchlanEl.value + "&antalrader=" + numrowsEl.value + "&yrkesomradeid=" + onlyitEl.value + "&nyckelord=" + searchTextEl.value, true);
    xhr.send();
}
// searchbuttonEL: When searchbutton is clicked, run the search()-function.
searchbuttonEl.addEventListener("click", search, false);



// Logo reload page.
function logoReload() {
    window.location = '/javascript/projekt/af.htm';  
}
logoEl.addEventListener("click", logoReload, false);