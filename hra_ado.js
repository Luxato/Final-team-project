/**
 * Created by True on 3.12.2016.
 */

var c = 100;
var t;
var timer_is_on = 0;

$(document).ready(function() {
    $(".draggable").draggable({grid: [5,5], stack: ".draggable"});
    $.fn.rotationDegrees = function () {
        var matrix = this.css("-webkit-transform") ||
            this.css("-moz-transform")    ||
            this.css("-ms-transform")     ||
            this.css("-o-transform")      ||
            this.css("-webkit-transform");
        this.css("transform");

        if(typeof matrix === 'string' && matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return angle;
    };

    $('.rotate').click("on", function() {
        var rotateAngle = parseInt($(this).rotationDegrees());
        if (rotateAngle === 315) {
            $(this).css({"transform": "rotate(" + "0" + "deg"});
        } else {
            rotateAngle -= 45;
            $(this).css({"transform": "rotate(" + rotateAngle + "deg"});
        }
    });


    function random() {

        $('#triangle1').animate({"left":Math.round(Math.random()*500) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#triangle2').animate({"left":Math.round(Math.random()*500) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#triangle3').animate({"left":Math.round(Math.random()*500) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#triangle4').animate({"left":Math.round(Math.random()*500) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#triangle5').animate({"left":Math.round(Math.random()*500) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#square').animate({"left":Math.round(Math.random()*500) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#parallelogram').animate({"left":Math.round(Math.random()*500) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
    }

    random();

    $('#random').click(random);

    $('#solution').click(function() {

        $('#triangle1').animate({"left": 50,
            "top":130}, 3000);
        $('#triangle2').animate({"left": 50,
            "top":130}, 3000);
        $('#triangle3').animate({"left": 350,
            "top":130}, 3000);
        $('#triangle4').animate({"left": 150,
            "top":330}, 3000);
        $('#triangle5').animate({"left": 250,
            "top":330}, 3000);
        $('#square').animate({"left": 250,
            "top":130}, 3000);
        $('#parallelogram').animate({"left": 150,
            "top":330}, 3000);

    setTimeout(function(){ random(); }, 4000);

    });

});

window.showTutorial = function () {
    swal({
        title: "Návod"
        , html: true
        , confirmButtonText: "Rozumiem"
        , text: "<ul>" +
        "    <li>Cieľom hry je zložiť štvorec vo vyznačenej ploche</li>" +
        "    <li>Na začiatku, pre náhľad riešenia, kliknite na  <strong>Show Solution</strong></li>" +
        "    <li><strong>Ľavé tlačidlo myši:</strong>: Otočiť vľavo</li>" +
        "    <li><strong>Držanie ľav. tlačidla:</strong>: Pohyb </li>" +
        "    <li>Pre ukončenie hry kliknite na tlačítko <strong>END</strong></li>" +
        "    <li>Útvar ste úspešne zložili, ak získate skóre <strong>100 bodov</strong></li>" +
        "</ul>"
    })
};


if (localStorage.game) {
    $("#prevpoints").html(localStorage.game);
    $("#bestpoints").html(localStorage.bestgame);
} else {
    $("#results").hide();
}


function stopCount() {
    var solution = 870*700;
    var user_score = count_whitespace("");
    var left = count_whitespace("left");
    var top = count_whitespace("top");
    console.log(left);
    console.log(top);
    var result = (((left / 870)*100) + ((top / 700)*100)) / 2;
    if (result > 100) {
        result = ((result-100)-100);
    }
    if (result < 0) {
        result = result*(-1);
    }
    result = Math.round(result);
    localStorage.game = result;
    if (localStorage.bestgame < result || typeof(localStorage.bestgame) == "undefined")
        localStorage.bestgame = result;
    alert('Tvoje skore je ' + result +' bodov');
}


function reset() {
    location.reload();
}

function count_whitespace(what){
    var left = 0;
    var top = 0;
    $("#block").children().each( function(){
        left += (($(this).position().left-40)/100).toFixed(1)*100;
        top += (($(this).position().top-130)/100).toFixed(1)*100;
    });
    if (what == "left")
        return left;
    else if (what == "top")
        return top;
    else 
        return left*top;
}
