/* casova os inspirovana z http://jsfiddle.net/yinnette/XdQ5Y/ */

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

	this.container.height(this.container.height() + 80);

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
	var p=this.par
	this.content.click(function () {

		p.resetItems();
		marker.pjdw().resetMarks();

		console.log('clicked');
		marker.setEmpMark();
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

	//console.log(y1);
	//console.log(y2);

	if(y1.substr(l1-4) == ".st.")
	{
		y1=parseInt(y1.substr(0,(l1-4)));
		y1 = (y1 - 1) * 100 +49;
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
	
	//console.log(y1);
	//console.log(y2);

	//console.log(y1-y2)

	return y1 - y2;
}