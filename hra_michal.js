var countTrashItems = 1;
var overallTrashItems = 1;
var points = 0;
var sec = 0;
var speed = 1200;
var interval, interval2;

if (localStorage.points) {
    $("#prevpoints").html(localStorage.points);
    $("#prevtime").html(localStorage.seconds + " sek.");
    $("#bestpoints").html(localStorage.bestPoints);
    $("#besttime").html(localStorage.bestSeconds + " sek.");
} else {
    $("#results").hide();
}

function randomPosition(){

    var h = $("#hra").height() - 50;
    var w = $("#hra").width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];    

}

$("#button").click(function(){
    moveTrash();
    $("#button").fadeOut(300);
    interval = setInterval(newTrashItem, 1200);
    interval2 = setInterval( function(){
        $("#time").html( (pad(parseInt(sec/60,10))) + ":" + (pad(++sec%60)) );
    }, 1000);
});

function moveTrash(){
    var newq = randomPosition();
    $('#trash').animate({ top: newq[0], left: newq[1] }, speed*4, function(){;
        if (countTrashItems <= 10)
            moveTrash();        
    });
};

function newTrashItem(){
    var newq = randomPosition();
    $("#hra").append("<div id='"+overallTrashItems+"' class='trash-item'>");
    $("#hra").find("#"+overallTrashItems).css("top",newq[0]).css("left",newq[1]).draggable();

    countTrashItems++;
    overallTrashItems++;

    speed = 1200-(sec*10);
    if (speed < 500)
        speed = 500;

    clearInterval(interval);
    interval = setInterval(newTrashItem, speed);


    if (countTrashItems > 10) {
        alert("Koniec hry, vaše skóre je: " + points);
        localStorage.points = points;
        localStorage.seconds = sec;
        if (localStorage.bestPoints < points || typeof(localStorage.bestPoints) == "undefined")
            localStorage.bestPoints = points;
        if (localStorage.bestSeconds < sec || typeof(localStorage.bestSeconds) == "undefined")
            localStorage.bestSeconds = sec;
        clearInterval(interval);
        clearInterval(interval2);
        location.reload();
    }
};

function pad(val) {
    return val > 9 ? val : "0" + val;
}

$( function() {
    $( ".trash-item" ).draggable();
    $( "#trash" ).droppable({
        drop: function( event, ui ) {
                $(ui.draggable).fadeOut(400);
                countTrashItems--;
                points++;
                $("#points").html(points);
            }
    });
});