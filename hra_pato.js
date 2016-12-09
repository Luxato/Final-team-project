// JavaScript Document

imgdir = 'img/';

var score = 0;
var clicks = 0;
var selectedr = null;
var selectedc = null;
var startpost = 1;
var endpost = (startpost-1 < 0 ? 2 : startpost-1);
var game_is_over = false;
var show_messages = false;
var maxdisks;
var disks;
var board = new Array(2);
var theAnim;
  var yourclicks;
  var yourscore;
  var percentOk;


function initboard(startpost, disks) {
  var len = board[0].length;
  
  for (i = 0; i < len; i++) {
    board[0][i] = 0;
    board[1][i] = 0;
    board[2][i] = 0;
  }
  for (i = len-disks, j = 0; i < len; i++, j++) {
    board[startpost][i] = len - j - 1;
  }

}



function getName( num ) {
  if (num == 0) 
    return "post.png";
  
  return "disk" + num + ".png";
}

function message(str, force) {
  if (force || !game_is_over && !show_messages)
    document.getElementById('area').value = str;
}

function isempty(num) {
  for (i = 0; i < board[num].length; i++) {
    if ( board[num][i] != 0) 
    return false;
  }
  return true;
}

function topmost(num) {
  for (i = 0; i < board[num].length; i++) {
    if (board[num][i] != 0) 
      return  i;
  }
  return -1;
}

function ispost(i,j) {
  return (board[j][i] == 0);
}


        
function drawboard() {
  var draw = '';
  draw += "<table id=\"tabulka\" class=\"hanoi\" cellspacing=0 cellpadding=0 border=0>";
  draw += "<tr>";

  for (j = 0; j < board.length; j++) {
    draw += "<td>";
    for (i=0; i< board[0].length; i++) {
      if(i==1){
      draw += "<a href='javascript:clicked("+i+","+j+")'>";
      draw += "<img id=\"stlp\"  src='" + imgdir + getName(board[j][i]) + "' name='pos"+ j + i + "' border=0>";
      draw += "</a>";
      }
      else{
        draw += "<a href='javascript:clicked("+i+","+j+")'>";
        draw += "<img id=\"stlp\"  src='" + imgdir + getName(board[j][i]) + "' name='pos"+ j + i + "' border=0>";
        draw += "</a>";
      }
      
      


    }
    draw += "</td>";
  }
  draw += "</tr></table><br>";

  draw += "<form name='disp'><textarea id=\"area\" name='message' wrap=virtual rows=2 cols=40></textarea><br>";
  draw += "<button value=\"Start\" id=\"start\" onclick=\"window.location.reload();\">Začni novú hru</button>";
   draw += "<button onclick=\"stav()\">Pozri stav</button> <br><br>";
   
  
  document.getElementById('hra').innerHTML = draw;
  initdrag();
}


function initdrag() {
  $("td").each(function(){
    $(this).droppable({
      drop: function( event, ui ) {
        $( this ).find("a img").first().click();
        console.log($( this ).find("a img").first());
      }
    });
  });
  $("img").each(function(){
    if ($(this).attr("src") != "images/post.png") {
      $(this).draggable({
        revert: true,
        revertDuration: 0,
        start: function() {
          $(this).click();
        }
      });
    }
  });
}

function animate(x,y,name) {
  theAnim.addFrame( "pos"+x+""+y, imgdir + name);
}    

function clicked(i,j) {
  
  document.forms[0].message.focus(); 
  document.forms[0].message.blur();

  initdrag();

  if (game_is_over)
    window.location.reload(); 
  if (!isselection() && ispost(i,j)) { 
    message("Vyber kus na presun."); 
    
    return;
  }   //stav ked kliknem na zeleny disk
  if (!ispost(i,j)) { 
    //spustim dragable
  
    toggle(j);  
    return; 
  };
  if (ispost(i,j) && selectedc == j) { 
    message("Presun kus na inu poziciu");

    return; 
  }
  if (!legalmove(j)) { 
    message("Nemozes to tu umiestnit."); 
  
    return; 
  }
  move(j); 
  return;
}



function legalmove(j) {

  if (isempty(j)){ 
    score++;
    yourscore = 'Počet premiestnení: ' + score;
    document.getElementById('score').innerHTML = yourscore;
    clicks++;
    yourclicks = 'Počet pokusov o premiestnenie: ' + clicks;
    document.getElementById('click').innerHTML = yourclicks;
    percentOk = 'Úspešnosť vašej hry: ' + score/clicks*100;
    document.getElementById('percent').innerHTML = percentOk;
    return true;
  }
  if(board[j][topmost(j)] < board[selectedc][selectedr]) 
    score++;
  clicks++;
  yourclicks = 'Počet pokusov o premiestnenie: ' + clicks;
  yourscore = 'Počet premiestnení: ' + score;
  document.getElementById('click').innerHTML = yourclicks;
  document.getElementById('score').innerHTML = yourscore;
  percentOk = 'Úspešnosť vašej hry: ' + score/clicks*100;
  document.getElementById('percent').innerHTML = percentOk;
  return (board[j][topmost(j)] < board[selectedc][selectedr]);
}

function stav() {
  document.getElementById('ukazstav').innerHTML = 'Pocet realnych premiestneni:' + score + '<br>' + 'Pocet pokusov o premiestnenie:' + clicks + '<br>' + 'Ucinnost vasej strategie:' + score/clicks*100 ;

}


function isselection() {
  return selectedc != null;
}

function toggle( num ) {
  var toppos = topmost(num);
  
  if (selectedc == num && selectedr == toppos) {                        
    selectedc = null; selectedr = null;
    animate(num,toppos,"disk" + board[num][toppos] + ".png");
    message("Vyber kus na presun");
    
      
    return;
  }
  if (isselection()) {

    animate(selectedc,selectedr,"disk" + board[selectedc][selectedr] + ".png");  
   
  }
  selectedc = num; selectedr = toppos;
  animate(num,toppos,"disk" + (board[num][toppos]+6) + ".png");

  message("Vyber si miesto, kde chces premiestnit kus.");
}

function move( num ) {
  var toppos = (!isempty(num) ? topmost(num) : board[num].length);
  board[num][toppos-1] = board[selectedc][selectedr];
  board[selectedc][selectedr] = 0;
  animate(selectedc,selectedr,"post.png");
  animate(num,toppos-1,"disk" + board[num][toppos-1] + ".png");
  selectedc = null; selectedr = null;

  message("Vyber kus na presun.");
  game_over();
}

function game_over(forceMsg) {
  var filledpost = null;
  var val = 0;
  for (k = 0; k < board.length; k++)  {
    val += ( isempty(k) ? 1 : 0 );
    if (!isempty(k))
      filledpost = k;
  }
  
  if (val == 2 && isempty(startpost)) {
    message("Vyhral si!", forceMsg);
    game_is_over = true;
    endpost = filledpost;
  }
  return game_is_over;
}


function Animation() {
  this.imageNum = new Array();  
  this.imageSrc = new Array();  
  this.frameIndex = 0;          
  this.alreadyPlaying = false;  
  
  this.getFrameCount = getframecount;   
  this.moreFrames = moreframes;        
  this.addFrame = addframe;            
  this.drawNextFrame = drawnextframe;   
  this.startAnimation = startanimation; 
}

function getframecount() {  
  return this.imageNum.length; 
}
function moreframes() {  
  return this.frameIndex < this.getFrameCount(); 
}
function startanimation() {
  if (!this.alreadyPlaying) {
    theAnim.alreadyPlaying = true;
    setTimeout('theAnim.drawNextFrame()',5);
  }
}

function addframe(num, src) {
  var theIndex = theAnim.imageNum.length;
  theAnim.imageSrc[theIndex] = src;
  theAnim.imageNum[theIndex] = num;
  theAnim.startAnimation();
}

function drawnextframe() {
  if (theAnim.moreFrames()) {
    document.images[ theAnim.imageNum[theAnim.frameIndex] ].src = theAnim.imageSrc[theAnim.frameIndex];
    theAnim.frameIndex++;
    setTimeout('theAnim.drawNextFrame()', 30);
  } else {
    theAnim.alreadyPlaying = false;
  }
}



function zadane(){
var pocet = parseInt( document.getElementById('pocet').value);

  for (var i = 0; i <13; i++) {
    this[i] = new Image();
    this[i].src = imgdir + "disk"+[i+1]+".png";
  }

    maxdisks = pocet;
    disks = pocet;

board[0] = new Array(maxdisks + 1);
board[1] = new Array(maxdisks + 1);
board[2] = new Array(maxdisks + 1);
initboard(startpost, disks);
drawboard();

 theAnim = new Animation();

message("Vyber kus na presunutie.");



}
