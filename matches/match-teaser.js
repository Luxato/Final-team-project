var zapalky =[];

var started=false;

var index=0;

var destroyed = 0;

var left_offset=0;
var top_offset=0;
//var data = null;

var timer;


var score = 0;

var shown = false;

var zp=false;

function reset_time() {
  // body...
  seconds = 0;
  minutes= 0;
  $('#timer').html('0 : 0');
}

function start_timer()
{
  
  timer=setInterval(function()
  {
    
    seconds++;
    if(seconds == 60)
    {
      minutes++;
      seconds=0;
    }

    $('#timer').html(minutes + ' : ' + seconds);
  }, 1000);
}

function stopTimer()
{
  clearInterval(timer);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function set_offsets()
{
  top_offset = $("#board").offset().top;
    left_offset = $("#board").offset().left
}

function bestFit(zapalka, final)
{
  var eps=50;
  var min=Number.POSITIVE_INFINITY;
  var min_pos = null;
  var pos=zapalka.getPosition();
 // alert(pos.left + " " + pos.top);
  for(var i=0; i< final.length; i++)
  {
   // alert("final "+ i +" left = " +final[i].left);
    var left_low = (+final[i].left) - eps;
    var left_high = +final[i].left +  +eps;
    //alert(" scitam " + final[i].left + " s " + eps + " a  dostavam: " +  left_high);
    var top_low = +final[i].top - eps;
    var top_high = +final[i].top +  +eps;
    var rot_low = +final[i].rot + 0;
    var rot_high = +final[i].rot + 180;
    //alert("testing againsts " + final[i].left + " " + final[i].top);
    if((pos.left > left_low) && (pos.left < left_high))
    {
     // alert ("for " + i + " is "+ pos.left + " in " + left_low + " " + left_high);
      if((pos.top > top_low) &&(pos.top < top_high))
      {
       // alert(pos.top + " in " + top_low + " " + top_high);
        if((zapalka.getRotation() == rot_low) || (zapalka.getRotation() == rot_high))
        {
         // alert("matched");
          var dis = Math.sqrt(Math.pow((pos.left - final[i].left),2) + Math.pow((pos.top - final[i].top),2));
          if(dis < min)
          {
            min = dis;
            min_pos=i;
          }
        }
        /*else
        {
          alert(zapalka.getRotation() + " not in " + rot_low + " " + rot_high);
        }*/
      }
    }
  }
  return (min_pos);
}

function validate(index)
{
  //alert("holy fuuuuck");
  //alert("checking");
  var checked = [];
  for (var i=0; i< games[index].final.length; i++)
  {
    checked.push(false);
  }
  /*for(var i = 0; i< zapalky.length; i++)
  {
    alert(zapalky[i].getPosition().top);
  }*/
  for (var i=0; i< zapalky.length; i++)
  {
    var f=bestFit(zapalky[i], games[index].final);
    if(f !== null)
    {
      //alert("zapalka " + i + " ma miesto: " + f);
      //alert("poz: " + zapalky[i].getPosition().left + " " + zapalky[i].getPosition().top);
      checked[f]=true;
    }
  }
  for (var i=0; i< checked.length; i++)
  {
    if (checked[i] == false)
    {
     // alert("is false");
      return;
    }
  }
 // alert(index);
 // alert(parseInt(games[index].remove));
  if(destroyed !== parseInt(games[index].remove))
  {
   // alert ("not removed enough");
    return;
  }

  if(shown)
  {
    //alert ("videl si vysledok nie je to fer");
    return;
  }

  alert("finished");
  finalize(games[index].final);
if(zp == false)
{
  score += (200 - (minutes * 60 + seconds)) * parseInt(games[index].diff);
  reset_time();
}
 // setTimeout(function(){
   // console.log("managed to win")
  //},3000);
  stopTimer();
  start_timer();
  next();

  //alert(checked[2]);
  //alert(data.games[0]s[0].final[0].left);
}

function finalize(final)
{
  for(var i = 0; i < final.length ; i++)
  {
    var pos_left = +final[i].left + 3;
    var pos_top = +final[i].top  + 3;
    var rot = final[i].rot;
    zapalky[i].rotate(0);
    //alert("setting " + pos_left + " " + pos_top);
    zapalky[i].setPosition(pos_left,pos_top);
    zapalky[i].rotate(rot);
    zapalky[i].css('visibility', 'visible');
  }
  for(var i= final.length; i < zapalky.length; i++)
  {
    zapalky[i].css('visibility', 'hidden');
  }
}

function destroy()
{
  $("#destroyer").hide();
  $(".match").remove();
  $("#score").html("");
}

function setUp()
{
	//alert("setting up");
	  $( ".match" ).width(160);
    $( ".match" ).height(25);
    $( ".match" ).draggable( 
    {

      containment: "parent", 	
      	
      stop: function(event, ui) 
      {

        // Show dropped position.
        var Stoppos=$(this).getPosition();
        var angle=$(this).getRotation();
        validate(index);
        console.log("STOP: \nLeft: "+ Stoppos.left + "\nTop: " + Stoppos.top);
       // alert("Rotation: "+ angle);
      }
    }
    );
    $('<img src="./matches/match.png" width="160" height="25">').appendTo('.match');
   
    $('.match').click(function() {
       var pos= $(this).getPosition();
      // alert("left: " + pos.left + " top: "+ pos.top);	
 	    $(this).addRotation();
      validate(index);
    });
}

function load(index) {
    destroy();
    shown=false;
    $("#destroyer").show();
    var max_top = 0;
    var max_left = 0;

    destroyed=0;
    $("#desc").html ('<p class="title">' + games[index].desc + '</p>');
    zapalky=[];
    for (var i = 0; i < games[index].original.length; i++) {
      var new_div = $('<div class="match"> </div>');
      zapalky.push(new_div);
      new_div.appendTo('#board');
    }
    setUp();
    original= games[index].original;
    final = games[index].final;


    for(var i=0; i<zapalky.length; i++)
    {
      zapalky[i].setPosition(games[index].original[i].left, games[index].original[i].top);

      if(parseInt(games[index].original[i].left) > max_left)
      {
        max_left = parseInt(games[index].original[i].left);
      }

      if(parseInt(games[index].original[i].top) > max_top)
      {
        max_top = parseInt(games[index].original[i].top);
      }
      //var p = zapalky[i].getPosition();
      //alert("Gotten: for " +i + " " + p.left + " when i should have gotten: " + games[index].original[i].left);
      zapalky[i].rotate(games[index].original[i].rot);

    }
    //var p = zapalky[0].getPosition();
    //left_offset = p.left - games[index].original[0].left;
    //top_offset = p.top - games[index].original[0].top;
    
    //alert("offset: " + left_offset + " " + top_offset);

    //alert("why is this not doing")
    /*for(var i=0; i<zapalky.length; i++)
    {
      var p = zapalky[i].getPosition();
      //alert("Gotten: " + p.left + " when i should have gotten: " + games[index].original[i].left);
    }*/
    $("#destroyer").setPosition(0,max_top + 120);
    $("#board").width(max_left + 320);
}

  //alert("a");

  jQuery.fn.getRotation = function()
  {
    var matrix = $(this).css("transform");
    if( matrix !== 'none')
    {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }

    angle = (angle < 0) ? angle + 360 : angle;
    return (angle);
  }

  jQuery.fn.getPosition = function()
  {
    set_offsets();
    var angle = $(this).getRotation();
    $(this).rotate(0);
    var Stoppos = $(this).offset();
    Stoppos.left -= left_offset;
    Stoppos.top -= top_offset;
    $(this).rotate(angle);
    return (Stoppos);
  }

  jQuery.fn.rotate = function(angle)
  {
    $(this).css({'transform' : 'rotate('+ angle +'deg)'});
  }

  jQuery.fn.addRotation = function() {
    
    var Stoppos=$(this).getPosition();
        //alert("STOP: \nLeft: "+ Stoppos.left + "\nTop: " + Stoppos.top);

    var angle=$(this).getRotation();
    angle +=45;
    $(this).rotate(angle);
  };

  jQuery.fn.setPosition = function(left,top)
  {
    set_offsets();
    /*$(this).position({
      of: $(this).parent(),
      my: 'left+'  + left + ' top+' +  top,
      at: 'left top'
    });*/
    var c = parseInt(top_offset) + parseInt(top);
    var a = parseInt(left_offset) + parseInt(left);
    //alert("shit " + c);
    $(this).offset({ top: c, left: a })
  }

function next() {
  // body...
  stopTimer();
  
  index++;
  if(index == games.length)
  {
    alert("final ");
    games=shuffle(data.games);
    index=0;
    destroy();
    var highScore = 0;
      if(localStorage.getItem("zapalkyScore") !== null)
      {
        highScore = parseInt(localStorage.getItem("zapalkyScore"));
      }

      if (score > highScore)
      {
        highScore = score;
      }
      $("#score").html("Terajšie skóre je " + score + "<br>Najvyššie skóre je " + highScore );
      localStorage.setItem("zapalkyScore",highScore);
  }
  else
  {
    start_timer();
    load(index);
  }

}



  $( function() {

    destroy();
    
    //$('#board').draggable();
    //$('#1st').setPosition(200,300);
    top_offset = $("#board").offset().top;
    left_offset = $("#board").offset().left
    games=shuffle(data.games);

    $("#startGame").click(function()
      {
        reset_time();
        //zp=false;
        if(started)
        {
          next();
        }
        else
        {
          score=0;
          load(index);
          start_timer();
        }
        started=true;
      });

    $("#restart").click( function()
      {
        if(started)
        {
          load(index);
          stopTimer();
          start_timer();
        }
      });

    $("#destroyer").droppable(
    {
      accept:   '.match',
      drop: function(event, ui)
      {
        destroyed++;
        $(ui.draggable).addClass("destoyed");
        $(ui.draggable).css("visibility", "hidden");
        validate(index);
      }
    });

    $("#surrender").click( function()
    {
      if(started)
      {
        finalize(games[index].final);
        shown=true;
        zp=true;
      }
    });

    $("#stoptime").click(function()
    {
      destroy();
      stopTimer();
    });

    $("#showScore").click(function () {
      destroy();
      stopTimer();
      var highScore = 0;
      

      if(localStorage.getItem("zapalkyScore") !== null)
      {
        highScore = parseInt(localStorage.getItem("zapalkyScore"));
      }

      if (score > highScore)
      {
        highScore = score;
      }
      $("#score").html("Terajšie skóre je " + score + "<br>Najvyššie skóre je " + highScore );
      localStorage.setItem("zapalkyScore",highScore);

    });
    //alert(games[0].remove);
    
    //alert(matchData.games[0]s[0].original[0].left);

  } );