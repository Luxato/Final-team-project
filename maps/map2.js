var bot_left = {lat: 47.50393, long: 16.768537 } // lat je height
var top_right = {lat: 49.559947, long: 22.881291}   // long je width

var diff = {lat: top_right.lat - bot_left.lat, long: top_right.long - bot_left.long}



function marker(coordinates, left, top, gpsToPix, container, nazov)
{
	var fig = $('<figure class="marker_cont"> <img class="marker_show" src="./maps/index.png" width="30px" height="30px"> <aside> ' + nazov + '</aside> </figure');
	fig.appendTo(container);
	fig.css(
	{
		position: "absolute",
		left: (coordinates.long - left.long)  * gpsToPix.long,
		top: (top.lat - coordinates.lat )  *  gpsToPix.lat,
		margin: 0,
		padding: 0
	});
}

/*PairMarkerTime.prototype.get = function() {
	// body...
	alert(this.marker);
};*/

$( document ).ready(function()
{
	//alert("test");
	var width=$("#mapa_slovenska2").width();
	var height=$("#mapa_slovenska2").height();

	//alert(width + " " + height);

	//console.log(diff.lat + " " + diff.long);

	var gpsToPix = {lat: (height /diff.lat ), long: (width / diff.long) }

	//console.log(gpsToPix.lat + " " + gpsToPix.long);

	var markers=[];

	$.getJSON('pamiatky.json', function (data) 
	{

		for (var index in data.pamiatky) {

			console.log(data.pamiatky[index].sirka);
			console.log(data.pamiatky[index].dlzka);

			var coordinates = {lat: data.pamiatky[index].sirka, long: data.pamiatky[index].dlzka}

			markers.push(new marker(coordinates, bot_left, top_right, gpsToPix, $('#map2_holder'), data.pamiatky[index].nazov));
		}

	});
});