var bot_left = {lat: 47.50393, long: 16.768537 } // lat je height
var top_right = {lat: 49.559947, long: 22.881291}   // long je width

var diff = {lat: top_right.lat - bot_left.lat, long: top_right.long - bot_left.long}

var markers=[];

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

	this.fig=fig;
	console.log(fig.children('img').attr("src"));
}

marker.prototype.resetMark = function() {

	this.fig.children('img').remove();
		//marker.fig.children().find('img').remove();
	this.fig.prepend($('<img class="marker_show" src="./maps/index.png" width="30px" height="30px">'));
};

marker.prototype.addTimelineItem = function(item) {

	this.item=item;

	


	this.fig.click(function () {
		//console.log("clicked on marker");
		item.parent().resetItems();

		item.addInterval(500);

	});
	// body...
};

/*PairMarkerTime.prototype.get = function() {
	// body...
	alert(this.marker);
};*/

function timeLine(container)
{
	this.container=container;
	var body = $('<div class="timeline">');
	body.appendTo(container);
	this.body= body;
	this.items=[];
}

timeLine.prototype.resetItems = function() {

	for(var i=0; i< this.items.length; i++)
	{
		this.items[i].removeInterval();
	}
	
};


timeLine.prototype.addItem = function(year, text) {
	

	var new_item = new timeLineItem(year,text,this);
	this.items.push(new_item);
	//this.body.append(new_item.content);

	this.container.height(this.container.height() + 150);

	this.lol = 2;

	return new_item;
};

timeLine.prototype.draw = function() {
	// body...
	this.items.sort(sortTimeLine);
	for (var index in this.items)
	{
		this.body.append(this.items[index].content);
	}
};


timeLine.prototype.getItem = function(index)
{
	return (this.items[index]);
}

function timeLineItem(year, text, par)
{
	this.year=year;
	this.text=text;
	this.par=par;
	var new_item = $('<div class="timeline-item">');
	var year_item=$('<div class="year" >' + year + '</div>');
	year_item.append($('<span class="timeline_mark"> <span class="dot"></span></span>'));
	new_item.append(year_item);
	var cont = $('<div class="info">'+ text + '</div>');
	new_item.append(cont);
	this.content = new_item;
}

timeLineItem.prototype.parent = function() {
	// body...
	return this.par;
};

timeLineItem.prototype.addMarker = function(marker) {


	this.marker = marker;

	this.content.click(function () {


		for (var i = markers.length - 1; i >= 0; i--) {
			console.log("reseting marks");
			markers[i].resetMark();
		}	

		console.log('clicked');
		marker.fig.children('img').remove();
		//marker.fig.children().find('img').remove();
		marker.fig.prepend($('<img class="marker_show" src="./maps/emp_index.png" width="30px" height="30px">'));
	});
	// body...
};

timeLineItem.prototype.addInterval = function(dur) {
	
	this.content.toggleClass('active');
	clearInterval(this.inteval);
	var item = this.content;
	this.inteval = setInterval( function()
	{
	
		item.toggleClass('active');
	},dur);

	// body...
};

timeLineItem.prototype.removeInterval = function() {
 	// body...
 	clearInterval(this.inteval);
 	this.content.removeClass("active");
 }; 

timeLineItem.prototype.getYear =function()
{
	return this.year;
}

function sortTimeLine(a,b)
{
	var y1 = a.getYear();
	var y2 = b.getYear();

	var l1= y1.length;
	var l2= y2.length;

	//console.log(y2.substr(l2-4));

	if(y1.substr(l1-4) == ".st.")
	{
		y1=parseInt(y1.substr(0,(l1-4)));
	}
	else
	{
		y1=parseInt(y1);
	}

	if(y2.substr(l2-4) == ".st.")
	{
		y2=parseInt(y2.substr(0,(l2-4)));
		y2 = (y2 - 1) *100 +49; 
	}
	else
	{
		y2=parseInt(y2);
	}
	
	return y1 - y2;
}


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
		for (var index in data.pamiatky) {

			console.log(data.pamiatky[index].sirka);
			console.log(data.pamiatky[index].dlzka);

			var coordinates = {lat: data.pamiatky[index].sirka, long: data.pamiatky[index].dlzka}

			var newMarker = new marker(coordinates, bot_left, top_right, gpsToPix, $('#map2_holder'), data.pamiatky[index].nazov);

			markers.push(newMarker);

			var newTimeLineItem = timeline.addItem(data.pamiatky[index].rokVzniku, data.pamiatky[index].nazov,timeline);

			newTimeLineItem.addMarker(newMarker);
			newMarker.addTimelineItem(newTimeLineItem);

			console.log(newTimeLineItem.parent());
		}
		timeline.draw();
		//console.log(sortTimeLine(timeline.getItem(0), timeline.getItem(1)));
		//timeline.getItem(0).addMarker(markers[0]);
		/*$(".timeline-item").click(function () 
		{
    		$(".timeline-item").removeClass("active");
    		$(this).toggleClass("active");*/
    /*$(this).prev(".timeline-item").toggleClass("close");
    $(this).next(".timeline-item").toggleClass("close");*/
		//});

	});
});