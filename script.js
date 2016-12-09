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