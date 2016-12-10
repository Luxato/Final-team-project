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

        $('#triangle1').animate({"left":Math.round(Math.random()*1000) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#triangle2').animate({"left":Math.round(Math.random()*1000) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#triangle3').animate({"left":Math.round(Math.random()*1000) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#triangle4').animate({"left":Math.round(Math.random()*1000) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#triangle5').animate({"left":Math.round(Math.random()*1000) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#square').animate({"left":Math.round(Math.random()*1000) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
        $('#parallelogram').animate({"left":Math.round(Math.random()*1000) +"px",
            "top":Math.round(Math.random()*300)+"px"}, 1000);
    }

random();
    $('#random').click(random);

    $('#solution').click(function() {


        $('#triangle1').animate({"left": 560,
            "top":260}, 3000);
        $('#triangle2').animate({"left": 560,
            "top":260}, 3000);
        $('#triangle3').animate({"left": 860,
            "top":260}, 3000);
        $('#triangle4').animate({"left": 660,
            "top":460}, 3000);
        $('#triangle5').animate({"left": 760,
            "top":460}, 3000);
        $('#square').animate({"left": 760,
            "top":260}, 3000);
        $('#parallelogram').animate({"left": 660,
            "top":460}, 3000);

random();

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
        "    <li>Pred začatím hry, kliknite na <strong>Start Game</strong></li>" +
        "    <li><strong>Ľavé tlačidlo myši:</strong>: Otočiť vľavo</li>" +
        "    <li><strong>Držanie ľav. tlačidla:</strong>: Pohyb </li>" +
        "</ul>"
    })
};



function timedCount() {
    document.getElementById("txt").value = c;
    c-=2;
    t = setTimeout(function(){ timedCount() }, 3000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
    alert('Tvoje skore je ' +c);
}


function reset() {
    location.reload();
}




