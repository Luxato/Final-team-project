var map;
var infowindow;
var markers=[];



window.aylmao =function() {
        
        var center = {lat: 48.44858 , lng: 18.91003};
        map = new google.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 8
        });

        function MyMarker(text,place,parent)
        {
        	var marker = new google.maps.Marker({
          		map: map,
          		zIndex:20,
          		position: place,
          		icon: new google.maps.MarkerImage( './maps/index.png', null,null, null, new google.maps.Size(35,30))
        	});

        	this.marker= marker;
        	this.place=place;
        	this.text = text;
        	this.parent=parent;

        	google.maps.event.addListener(marker, 'mouseover', function() {
          		infowindow.setContent(text + '<br> Súradnice: ' + place.lat + ' ' + place.lng );
          		infowindow.open(map, this);
        	});

        	google.maps.event.addListener(marker,'mouseout',function()
        	{
        		infowindow.close();
        	});
        }

        MyMarker.prototype.resetMark = function() {
        	this.marker.setIcon(new google.maps.MarkerImage( './maps/index.png', null,null, null, new google.maps.Size(35,30)));
        };

        MyMarker.prototype.pjdw = function() {
	
			return this.parent;
		};

		MyMarker.prototype.setEmpMark = function() {
			this.marker.setIcon(new google.maps.MarkerImage( './maps/emp_index.png', null,null, null, new google.maps.Size(35,30)));
		};

		MyMarker.prototype.addTimelineItem = function(item) {

			this.item=item;
			var p = this.parent;

			google.maps.event.addListener(this.marker, 'click',function () {
		//console.log("clicked on marker");

			p.resetMarks();
		
			item.parent().resetItems();

			item.addInterval(500);

		});
	// body...
};

       	function marker_holder() {
			this.markers=[];
		}

		marker_holder.prototype.addMark = function(text,place) {

			var m = new  MyMarker (text,place,this);
			this.markers.push(m);
			return m;
		};

		marker_holder.prototype.resetMarks = function() {
	
			for (var i = this.markers.length - 1; i >= 0; i--) {
				console.log("reseting marks");
				this.markers[i].resetMark();
			}	
		};

      	infowindow = new google.maps.InfoWindow();

      	var markers = new marker_holder();
      	//var mx = markers.addMark("diee", center);
		//mx.setEmpMark();


		$.getJSON('pamiatky.json', function (data) 
	{

		timeline = new timeLine($('#tholder'));
		markers = new marker_holder();
		for (var index in data.pamiatky) {



			var coordinates = {lat: parseFloat(data.pamiatky[index].sirka), lng: parseFloat(data.pamiatky[index].dlzka)}

			var newMarker = markers.addMark(data.pamiatky[index].nazov,coordinates);

			var newTimeLineItem = timeline.addItem(data.pamiatky[index].rokVzniku, data.pamiatky[index].nazov,timeline);

			newTimeLineItem.addMarker(newMarker);
			newMarker.addTimelineItem(newTimeLineItem);

			console.log(newTimeLineItem.parent());
		}
		timeline.draw();


	});



}
