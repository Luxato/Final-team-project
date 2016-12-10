// JavaScript Document

imgdir = 'img/';

var score = 0;
var kliky = 0;
var selectedr = null;
var selectedc = null;
var game_is_over = false;
var show_messages = false;
var maxdisks;
var plocha = new Array(2);
var theAnim;


function nastavVezu(disks) {
  var len = plocha[0].length;
  
  for (i = 0; i < len; i++) {
    plocha[0][i] = 0;
    plocha[1][i] = 0;
    plocha[2][i] = 0;
  }
  for (i = len-disks, j = 0; i < len; i++, j++) {
    plocha[1][i] = len - j - 1;
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
  for (i = 0; i < plocha[num].length; i++) {
    if ( plocha[num][i] != 0) 
    return false;
  }
  return true;
}

function topmost(num) {
  for (i = 0; i < plocha[num].length; i++) {
    if (plocha[num][i] != 0) 
      return  i;
  }
  return -1;
}

function ispost(i,j) {
  return (plocha[j][i] == 0);
}


        
function nakresliHru() {
  var draw = '';
  draw += "<table id=\"tabulka\" class=\"hanoi\" cellspacing=0 cellpadding=0 border=0>";
  draw += "<tr>";

  for (j = 0; j < plocha.length; j++) {
    draw += "<td>";
    for (i=0; i< plocha[0].length; i++) {
      if(i==1){
      draw += "<a href='javascript:zakliknute("+i+","+j+")'>";
      draw += "<img id=\"stlp\"  src='" + imgdir + getName(plocha[j][i]) + "' name='pos"+ j + i + "' border=0>";
      draw += "</a>";
      }
      else{
        draw += "<a href='javascript:zakliknute("+i+","+j+")'>";
        draw += "<img id=\"stlp\"  src='" + imgdir + getName(plocha[j][i]) + "' name='pos"+ j + i + "' border=0>";
        draw += "</a>";
      }

    }
    draw += "</td>";
  }
  draw += "</tr></table><br>";

  draw += "<form name='disp'><textarea id=\"area\" name='message' wrap=virtual rows=2 cols=40></textarea><br>";
  draw += '<div id="stav"></div>'
   
  
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

function animuj(x,y,name) {
  theAnim.addFrame( "pos"+x+""+y, imgdir + name);
}    

function zakliknute(i,j) {
  
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
  
    stlacenie(j);  
    return; 
  };
  if (ispost(i,j) && selectedc == j) { 
    message("Presun kus na inu poziciu");

    return; 
  }
  if (!bodovanie(j)) { 
    message("Nemozes to tu umiestnit."); 
  
    return; 
  }
  pohyb(j); 
  return;
}



function bodovanie(j) {

  if (isempty(j)){ 
    score++;
    kliky++;
     document.getElementById('stav').innerHTML = 'Počet posunov: ' 
    + kliky + '<br>' + 'Úspešnosť vašej hry: ' + score/kliky*100;
    return true;
  }
  if(plocha[j][topmost(j)] < plocha[selectedc][selectedr]) 
    score++;
    kliky++;
   document.getElementById('stav').innerHTML = 'Počet premiestnení: ' 
    + kliky + '<br>' + 'Úspešnosť vašej hry: ' + score/kliky*100;
 
  return (plocha[j][topmost(j)] < plocha[selectedc][selectedr]);
}




function isselection() {
  return selectedc != null;
}

function stlacenie( num ) {
  var toppos = topmost(num);
  
  if (selectedc == num && selectedr == toppos) {                        
    selectedc = null; selectedr = null;
    animuj(num,toppos,"disk" + plocha[num][toppos] + ".png");
    message("Vyber kus na presun");
    
      
    return;
  }
  if (isselection()) {

    animuj(selectedc,selectedr,"disk" + plocha[selectedc][selectedr] + ".png");  
   
  }
  selectedc = num; selectedr = toppos;
  animuj(num,toppos,"disk" + (plocha[num][toppos]+6) + ".png");

  message("Vyber si miesto, kde chces premiestnit kus.");
}

function pohyb( num ) {
  var toppos = (!isempty(num) ? topmost(num) : plocha[num].length);
  plocha[num][toppos-1] = plocha[selectedc][selectedr];
  plocha[selectedc][selectedr] = 0;
  animuj(selectedc,selectedr,"post.png");
  animuj(num,toppos-1,"disk" + plocha[num][toppos-1] + ".png");
  selectedc = null; selectedr = null;

  message("Vyber kus na presun.");
  game_over();
}

function game_over(forceMsg) {
  var filledpost = null;
  var val = 0;
  for (k = 0; k < plocha.length; k++)  {
    val += ( isempty(k) ? 1 : 0 );
    if (!isempty(k))
      filledpost = k;
  }
  
  if (val == 2 && isempty(1)) {
    message("Vyhral si!", forceMsg);
    game_is_over = true;
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

function validacia(pocet){
    if(pocet<3){
      alert('Zadaj cislo od 3 do 6 !!');
      window.location.reload();
    }
    if(pocet>6){
      alert('Zadaj cislo od 3 do 6 !!');
      window.location.reload();
    }

}


function zadane(){
var pocet = parseInt( document.getElementById('pocet').value);

validacia(pocet);

  for (var i = 0; i <13; i++) {
    this[i] = new Image();
    this[i].src = imgdir + "disk"+[i+1]+".png";
  }


plocha[0] = new Array(pocet + 1);
plocha[1] = new Array(pocet + 1);
plocha[2] = new Array(pocet + 1);
nastavVezu(pocet);
nakresliHru();

 theAnim = new Animation();

message("Vyber kus na presunutie.");



}
