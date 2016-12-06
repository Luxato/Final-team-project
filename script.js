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
