var bot_left = {lat: 47.7, long: 16.84 } // lat je height
var top_right = {lat: 49.6, long: 22.6}   // long je width




function PairMarkerTime (marker, time)
{
	this.marker = marker;
	this.time = time;
}

PairMarkerTime.prototype.get = function() {
	// body...
	alert(this.marker);
};

$( document ).ready(function()
{
	alert("test");
	var width=$("#mapa_slovenska2").width();
	var height=$("#mapa_slovenska2").height();

	//alert(width + " " + height);



	/*$.getJSON('pamiatky.json', function (data) 
	{

		for (var index in data.pamiatky) {


		}

	});*/
});