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
var Breadcrumb = function (current_page) {
    this.pages = [current_page];
    this.init = function () {
        if(typeof localStorage.pages == 'undefined') {
            localStorage.setItem("pages", JSON.stringify(this.pages));
        } else {
            this.pages = JSON.parse(localStorage.pages);
            if (this.pages.length > 5) {
                this.pages.shift();
            }
        }
        this.addPage(current_page);
    };
    this.addPage = function (webpage) {
        console.log(this.pages[this.pages.length - 1]);
        console.log(webpage);
        if (this.pages[this.pages.length - 1] != webpage) {
            this.pages.push(webpage);
        }
        localStorage.setItem("pages", JSON.stringify(this.pages));
    };
    this.draw = function () {
        var breadcrumb = $('#breadcrumb');
        for (var page in this.pages) {
            console.log("<li><a href='#'>"+this.pages[page]+"</a></li>");
        	breadcrumb.append("<li><a href='#'>"+this.pages[page]+"</a></li>");
        }
    };
    this.init();
    this.draw();
};