$( document ).ready(function() {
	resizeContainer();
    $('#side-menu').find("li.active").has("ul").children("ul").addClass("collapse in");
    $('#side-menu').find("li").not(".active").has("ul").children("ul").addClass("collapse");
});

$(function() {
	$('#side-menu').find("li").has("ul").children("a").on("click", function(e) {
        e.preventDefault();
        $(this).parent("li").toggleClass("active").children("ul").collapse("toggle");
    });
});


function resizeContainer() {
	var height = $("nav.navbar").height();
	$("#page-wrapper").css("min-height", window.innerHeight - height - 2);
}

window.addEventListener("resize", resizeContainer);


// Path base breadcrumb
var Breadcrumb = function() {
    var text = document.getElementsByClassName("actual")[0].textContent;
    var href = document.getElementsByClassName("actual")[0].childNodes[0].getAttribute("href");
    this.pages = [text+"|"+href];
    this.init = function () {
        if(typeof localStorage.pages == 'undefined') {
            localStorage.setItem("pages", JSON.stringify(this.pages));
        } else {
            this.pages = JSON.parse(localStorage.pages);
            if (this.pages.length >= 6 && this.pages[this.pages.length - 1] != text) {
                this.pages.shift();
            }
            this.addPage(text+"|"+href);
            while (this.pages.length >= 6) {
                this.pages.shift();
            }
        }
    };
    this.addPage = function (webpage) {
        if (this.pages[this.pages.length - 1] != webpage) {
            this.pages.push(webpage);
        }
        localStorage.setItem("pages", JSON.stringify(this.pages));
    };
    this.draw = function () {
        var breadcrumb = $('#breadcrumb');
        for (var page in this.pages) {
            text = (this.pages[page]).split("|")[0];
            href = (this.pages[page]).split("|")[1];
        	breadcrumb.append("<li><a href='"+href+"'>"+text+"</a></li>");
        }
    };
    this.init();
    this.draw();
};

new Breadcrumb();

// Uloha4 - pripomienkovac - Patrik Eliáš

function deleteAll(){ 
    localStorage.clear();
    napisPripomienku();
 
}

function vytvorPripomienku(){
  var name=prompt("Napíš pripomienku.");
  localStorage.setItem(name, "");
  napisPripomienku();
  }

function napisPripomienku(){
  var list = '<div class="list" id="list">';;
  for(i=0;i<localStorage.length;i++){
      list += '<input ' + localStorage.key(i) + '" type="checkbox" name="' + localStorage.key(i) + '" onMouseUp="vymazPripomienku(' + i + ')">';
      list += localStorage.key(i) + ' <br>';
    
  }
  list += '</div>';
  document.getElementById('listTask').innerHTML = list;
}

function vymazPripomienku(i){
  localStorage.removeItem(localStorage.key(i));
  napisPripomienku(); 
} 

function deleteAll(){ 
    localStorage.clear();
    napisPripomienku();
 
}  
// Koniec uloha4 Pripomienkovac - PAtrik Eliáš
// 
// Uloha3 - meniny - Patrik Eliáš

var Datumy = [];
var Mena = [];
var meno;
var datum;
var datum1;
var Januar= [];
var Februar= [];
var Marec= [];
var April= [];
var Maj= [];
var Jun= [];
var Jul= [];
var August= [];
var September= [];
var Oktober= [];
var November= [];
var December= [];
var dia = "áäčďéíľĺňóôŕšťúýÁČĎÉÍĽĹŇÓŠŤÚÝŽ";
var nodia = "aacdeillnoorstuyACDEILLNOSTUYZ";
var currentDate = new Date();
var day = currentDate.getDate()   ;
var month = currentDate.getMonth() + 1  ;
var year = currentDate.getFullYear()   ;
    
window.onload = function(){ 
    var datum = "<b>" + day + "." + month + "." + year + "</b>";
    document.getElementById("aktualnyDen").innerHTML += datum + "  Dnes má meniny ";
    start();
}

function meninyDnes(){
    if(month==1){
            document.getElementById("aktualnyDen").innerHTML+= Januar[day]; 
        }
    else if(month==2){
            document.getElementById("aktualnyDen").innerHTML+= Februar[day];
        }
    else if(month==3){
            document.getElementById("aktualnyDen").innerHTML+= Marec[day];    
            }
    else if(month==4){
            document.getElementById("aktualnyDen").innerHTML+= April[day];
            }
    else if(month==5){
            document.getElementById("aktualnyDen").innerHTML+= Maj[day];
            }
    else if(month==6){
            document.getElementById("aktualnyDen").innerHTML+= Jun[day];
            }
    else if(month==7){
            document.getElementById("aktualnyDen").innerHTML+= Jul[day];
            }
    else if(month==8){
            document.getElementById("aktualnyDen").innerHTML+= August[day];
            }
    else if(month==9){
            document.getElementById("aktualnyDen").innerHTML+= September[day];
            }
    else if(month==10){
            document.getElementById("aktualnyDen").innerHTML+= Oktober[day];
            }
    else if(month==11){
            document.getElementById("aktualnyDen").innerHTML+= November[day];
            }
    else if(month==12){
            document.getElementById("aktualnyDen").innerHTML+= December[day];
            }
 
}


function start(){
    Januar    = [];
    Februar   = [];
    Marec     = [];
    April     = [];
    Maj       = [];
    Jun       = [];
    Jul       = [];
    August    = [];
    September = [];
    Oktober   = [];
    November  = [];
    December  = [];
    if(window.XMLHttpRequest){
       xmlhttp=new XMLHttpRequest();
          }
    else{
       xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
          }
    xmlhttp.open("GET","meniny.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
    
    Datumy = [];
    Mena = [];
    for(var i=0;i<366;i++){
        Datumy.push( (xmlDoc.getElementsByTagName("den")[i].childNodes[0].nodeValue).toUpperCase());
        Mena.push(diaConvert((xmlDoc.getElementsByTagName("SK")[i].childNodes[0].nodeValue).toUpperCase()));
           
        }
   
    for(var i=0;i<366;i++){
        if(Datumy[i].substring(0,2)==01){
            Januar[i+1] = Mena[i];

            }
        if(Datumy[i].substring(0,2)==02){
            Februar[i-30] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==03){
            Marec[i-59] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==04){
            April[i-90] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==05){
            Maj[i-120] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==06){
            Jun[i-151] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==07){
            Jul[i-181] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==08){
            August[i-212] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==09){
            September[i-243] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==10){
            Oktober[i-273] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==11){
            November[i-304] = Mena[i];
            }
        if(Datumy[i].substring(0,2)==12){
            December[i-334] = Mena[i];
            }
    }
    meninyDnes();
}

// 20.10.

function upravDatum (datum1){
    if(datum1.length>6){
        return false;
    }

     if(datum1.length<6){
        if(datum1[1]=="." && datum1[3]=="."){         
           datum1= '0'+ datum1; 
           datum1= datum1[0] + datum1[1] + datum1[2] + '0' + datum1[3] + '.';
          
           return datum1;
        }
        else if(datum1[1]=="." && datum1[4]=="."){
            datum1= '0'+ datum1; 
            return datum1;
        }
        else if(datum1[2]=="." && datum1[4]=="."){
            datum1= datum1[0] + datum1[1] + datum1[2] + '0' + datum1[3] + '.';
            
            return datum1;
        }
        else return false;

        
    }
    if(datum1.length==6){
        if(datum1[2]=='.' && datum1[5]=='.')
            return datum1;
        else return false;
    }

}

function validujDatum (datum1) {
    var filter = /^(0[1-9]|[12][0-9]|3[0-1]|[1-9])\.(0[1-9]|1[0-2]|[1-9])./;
    if(!filter.test(datum1.toString())) {
    alert("Prosim zadajte datum v spravnom formate");
    return false;
    }
}


function ZistiMeno(){
    datum1 = document.getElementById('datum').value;
    datum1=upravDatum(datum1);
    validujDatum(datum1);
    document.getElementById( "zisteneMeno" ).style.display = 'block';



    var datum2 = datum1.substring(0,2);
    var meno2;
    if(datum1.substring(3,5) == '01'){
            meno2 = Januar[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == '02'){
            meno2 = Februar[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 03){
            meno2 = Marec[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 04){
            meno2 = April[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 05){
            meno2 = Maj[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 06){
            meno2 = Jun[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 07){
            meno2 = Jul[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 08){
            meno2 = August[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 09){
            meno2 = September[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 10){
            meno2 = Oktober[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 11){
            meno2 = November[parseInt(datum2)];
            document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    if(datum1.substring(3,5) == 12){
        meno2 = December[parseInt(datum2)];
        document.getElementById("zisteneMeno").innerHTML = meno2;
        }
    }
    function diaConvert(text) {
            var convertText = "";
            for (var i = 0; i < text.length; i++) {
                if (dia.indexOf(text.charAt(i)) != -1) {
                    convertText += nodia.charAt(dia.indexOf(text.charAt(i)));
                }
                else {
                    convertText += text.charAt(i);
                }
            }
            return convertText;
        }


function ZistiDatum(){
    meno2 = document.getElementById('meno').value;
    meno2=meno2.toUpperCase();
    meno2=diaConvert(meno2);

 
  
        
    for(var i=0;i<366;i++){
            if(Mena[i] == meno2){
                if(i<=30){
                        document.getElementById("zistenyDatum").innerHTML = 1+i+".1.";
                    }
                if(i>30 && i<=59){
                        document.getElementById("zistenyDatum").innerHTML = i-30+".2.";
                    }
                if(i>59 && i<=90){
                        document.getElementById("zistenyDatum").innerHTML = i-59+".3.";
                    }
                if(i>90 && i<=120){
                        document.getElementById("zistenyDatum").innerHTML = i-90+".4.";
                    }
                if(i>120 && i<=151){
                        document.getElementById("zistenyDatum").innerHTML = i-120+".5.";
                        
                    }
                if(i>151 && i<=181){
                        document.getElementById("zistenyDatum").innerHTML = i-151+".6.";
                    }
                if(i>181 && i<=212){
                        document.getElementById("zistenyDatum").innerHTML = i-181+".7.";
                    }
                if(i>212 && i<=243){
                        document.getElementById("zistenyDatum").innerHTML = i-212+".8.";
                    }
                if(i>243 && i<=273){
                        document.getElementById("zistenyDatum").innerHTML = i-243+".9.";
                    }
                if(i>273 && i<=304){
                        document.getElementById("zistenyDatum").innerHTML = i-273+".10.";
                    }
                if(i>304 && i<=334){
                        document.getElementById("zistenyDatum").innerHTML = i-304+".11.";
                    }
                if(i>334){
                        document.getElementById("zistenyDatum").innerHTML = i-334+".12.";
                    }
        }
    }
}
function Tooltip( tooltip_id ) {
  document.getElementById( tooltip_id ).style.display = 'inline';
}
function schovajTooltip( tooltip_id ) {
  document.getElementById( tooltip_id ).style.display = "none";
}





