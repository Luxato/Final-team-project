var bot_left = {lat: 47.50393, long: 16.768537 } // lat je height
var top_right = {lat: 49.559947, long: 22.881291}   // long je width

var diff = {lat: top_right.lat - bot_left.lat, long: top_right.long - bot_left.long}

function marker(coordinates, left, top, gpsToPix, container, nazov, parent)
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
	this.parent=parent;
	this.fig=fig;
	console.log(fig.children('img').attr("src"));
}

marker.prototype.pjdw = function() {
	// body...
	return this.parent;
};

marker.prototype.resetMark = function() {

	this.fig.children('img').remove();
		//marker.fig.children().find('img').remove();
	this.fig.prepend($('<img class="marker_show" src="./maps/index.png" width="30px" height="30px">'));
};

marker.prototype.addTimelineItem = function(item) {

	this.item=item;
	var p = this.parent;

	this.fig.click(function () {
		//console.log("clicked on marker");

		p.resetMarks();
		
		item.parent().resetItems();

		item.addInterval(500);

	});
	// body...
};

marker.prototype.setEmpMark = function() {
		this.fig.children('img').remove();
		//marker.fig.children().find('img').remove();
		this.fig.prepend($('<img class="marker_show" src="./maps/emp_index.png" width="30px" height="30px">'));
};

function marker_holder() {
	this.markers=[];
	// body...
}

marker_holder.prototype.add = function(coordinates, left, top, gpsToPix, container, nazov) {

	var m = new  marker (coordinates, left, top, gpsToPix, container, nazov,this);
	this.markers.push(m);
	return m;
};

marker_holder.prototype.resetMarks = function() {
	
	for (var i = this.markers.length - 1; i >= 0; i--) {
			console.log("reseting marks");
			this.markers[i].resetMark();
		}	
};



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

	

	$.getJSON('pamiatky.json', function (data) 
	{

		timeline = new timeLine($('#map2_holder'));
		markers = new marker_holder();
		for (var index in data.pamiatky) {

			console.log(data.pamiatky[index].sirka);
			console.log(data.pamiatky[index].dlzka);

			var coordinates = {lat: data.pamiatky[index].sirka, long: data.pamiatky[index].dlzka}

			var newMarker = markers.add(coordinates, bot_left, top_right, gpsToPix, $('#map2_holder'), data.pamiatky[index].nazov);

			var newTimeLineItem = timeline.addItem(data.pamiatky[index].rokVzniku, data.pamiatky[index].nazov,timeline);

			newTimeLineItem.addMarker(newMarker);
			newMarker.addTimelineItem(newTimeLineItem);

			console.log(newTimeLineItem.parent());
		}
		timeline.draw();


	});
});