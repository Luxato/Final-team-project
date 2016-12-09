var menu = [
{ label: "Úloha 2", href: "#", class: "fa fa-level-down", items:
	[
	    { label: "Level 2", href: "#", class: "fa fa-home" },
	    { label: "Level 2 s childami", href: "#", class: "fa fa-level-down", items: 
	    	[
		   		{ label: "Level 3", href: "#", class: "fa fa-home" },
		   		{ label: "Level 3", href: "#", class: "fa fa-home" }
			]
		}
	]
},
{ label: "Úloha 3", href: "uloha3.html", class: "fa fa-calendar" },
{ label: "Úloha 4", href: "uloha4.html", class: "fa fa-bell" },
{ label: "Úloha 5", href: "uloha5.html", class: "fa fa-calculator" },
{ label: "Úloha 7", href: "#", class: "fa fa-map-o", items: 
	    	[
		   		{ label: "Prevedenie 1", href: "uloha7_1.html", class: "fa fa-globe" },
		   		{ label: "Prevedenie 2", href: "uloha7_2.html", class: "fa fa-map" }
			]},
{ label: "Úloha 8", href: "uloha8.html", class: "fa fa-code-fork" },
{ label: "Úloha 9", href: "uloha9.html", class: "fa fa-building" },
{ label: "Hry", href: "#", class: "fa fa-gamepad", items:
	[
		{ label: "Tomáš Gono", href: "hra_tomas.html", class: "fa fa-gamepad"},
		{ label: "Michal Paluš", href: "hra_michal.html", class: "fa fa-gamepad"},
		{ label: "Lukáš Stránovský", href: "hra_luky.html", class: "fa fa-gamepad"},
		{ label: "Patrik Eliáš", href: "hra_pato.html", class: "fa fa-gamepad"},
		{ label: "Adrián Rybanský", href: "hra_ado.html", class: "fa fa-gamepad"}
	]
},
{ label: "Kontakt", href: "kontakt.html", class: "fa fa-phone" }
];

var m = document.getElementById('side-menu');
for(var i = 0; i < menu.length; i++) {
    var li = document.createElement('li');
    var actualPath = (window.location.pathname).substring((window.location.pathname).lastIndexOf("/")+1);
    if (menu[i].href == actualPath) {
    	li.className += "actual";
    }
    var str = '<a href="'+menu[i].href+'"><i class="'+menu[i].class+'"></i> '+menu[i].label;
    if (menu[i].items) {
    	str += '<span class="fa arrow"></span></a>';
    	str += '<ul class="nav nav-second-level">';
    	for(var j = 0; j < menu[i].items.length; j++) {
    		if (menu[i].items[j].href == actualPath) {
		    	str += '<li class="actual">';
		    } else {
		    	str += '<li>';
		    }
    		str += '<a href="'+menu[i].items[j].href+'"><i class="'+menu[i].items[j].class+'"></i> '+menu[i].items[j].label;
    		if (menu[i].items[j].items) {
		    	str += '<span class="fa arrow"></span></a>';
		    	str += '<ul class="nav nav-third-level">';
		    	for(var k = 0; k < menu[i].items[j].items.length; k++) {
		    		str += '<li><a href="'+menu[i].items[j].items[k].href+'"><i class="'+menu[i].items[j].items[k].class+'"></i> '+menu[i].items[j].items[k].label+'</a><li>';
		    	}
		    	str += "</ul>";
		    } else {
		    	str += "</a></li>";
		    }
    	}
    	str += "</ul>";
    } else {
    	str += "</a></li>";
    }
    li.innerHTML = str;
    m.appendChild(li);
}