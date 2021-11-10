var xmlhttp;

window.onload=function() {
    document.addEventListener("deviceready", init, false);
    init();
}

function init() {
    document.getElementById('btnGetJoke').addEventListener('click', getJoke, false);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = receiveJoke;
    document.getElementById('btnAdd').addEventListener('click', addJoke, false);
    document.getElementById('btnDisplay').addEventListener('click', displayList, false);
    document.getElementById('btnClear').addEventListener('click', clearList, false);
}

function getJoke() {
    xmlhttp.open('GET', 'http://api.icndb.com/jokes/random/', true);
    xmlhttp.send();
}

function receiveJoke() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        var json = jQuery.parseJSON(xmlhttp.responseText);
        document.getElementById('joke').innerHTML = json.value.joke;
    }
}

function addJoke() {
    var joke = document.getElementById('joke');
    store.set(joke.innerHTML, null);
}

function displayList() {
    var oddRow = false;
    var output = "<table>"
    output += "<div id='jokeList'>Joke List</div>"
    store.forEach(function(key) {
        if(oddRow){
            output += "<tr class='odd'><td>" + key + "</td></tr>";
        }
        else{
            output += "<tr class='even'><td>" + key + "</td></tr>";
        }
        oddRow = !oddRow;
    });
    output += "</table>";
    document.getElementById('listArea').innerHTML = output;
    
}

function clearList() {
    document.getElementById('listArea').innerHTML = "";
    store.clear();
}