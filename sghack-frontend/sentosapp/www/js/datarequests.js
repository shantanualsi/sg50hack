var serverAddress =  'http://172.20.205.194:8080'

// Remove these on AJAX success
alldata = '{  "nearestAttractions" : {    "nearestAttractionsList" : [ {      "name" : "Marine Life Park",      "latitude" : 26269.24,      "longitude" : 26811.96,      "description" : "Marine Life Park is a part of Resorts World Sentosa, Sentosa, situated in southern Singapore. The 8-hectare park houses two attractions, the S.E.A Aquarium and the Adventure Cove Waterpark, and features the largest oceanarium in the world.",      "imageUrl" : "http://www.citytours.sg/images/Shark%20Seas.jpg"    }, {      "name" : "Maritime Experimental Museum",      "latitude" : 26570.71,      "longitude" : 26773.8,      "description" : "The Maritime Experiential Museum, formerly the Maritime Xperiential Museum and the Maritime Experiential Museum & Aquarium, is a museum in Resorts World Sentosa, Sentosa, Singapore, built to house the Jewel of Muscat and some of the 60,000 artefacts salvaged from the Belitung shipwreck, an Arabian dhow wrecked off the coast of Belitung Island.",      "imageUrl" : "http://www.yoursingapore.com/content/traveller/en/browse/see-and-do/family-fun/attraction/maritime-experiential-museum/_jcr_content/html/image.img.png"    }, {      "name" : "Equarius water park",      "latitude" : 26288.36,      "longitude" : 26683.15,      "description" : "Aquatic amusement park with an aquarium, waterslides, a wave pool, tubing, snorkeling & more.",      "imageUrl" : "http://4.bp.blogspot.com/-ytuLh_3rCzg/TyqxA58BVcI/AAAAAAAAMX0/wRh5JmzLMKo/s640/18+Taking+a+Daytime+Ride+on+Singapore+Cable+Car+%2540+The+Jewel+Box+%255BMount+Faber%255D%252C+Singapore+%2528Large%2529.jpg"    } ]  },  "upcomingEvents" : {    "events" : [ {      "name" : "Wings of time",      "time" : "19:40:00",      "location" : {        "name" : "Wings of time",        "latitude" : 26199.99,        "longitude" : 26004.0,        "description" : "",        "imageUrl" : null      }    } ]  },  "counter" : {    "count" : 6  }}'
alldata = JSON.parse(alldata);

//
// $.getJSON('alldata.json', function(json){
// 	alldata = json;
// });

var getBeaconData = function(beaconId){
	$.ajax({
		type: "GET",
		url: serverAddress+'/alldata/beacon'+beaconId,
		headers:{
			"Access-Control-Allow-Origin":'*',
		},
		crossDomain: true,
		success: beaconDataSuccess,
		error: function () {
			console.log("------------------------------ Ajax error ------------------------------- ");
		}
	});
};

var beaconDataSuccess = function(result){
	console.log('Here')
	var visitorNumber = alldata.counter.count;
	$('#current-visitor-count').html(visitorNumber)
	console.log(visitorNumber)
	$.each(alldata.nearestAttractions.nearestAttractionsList, function(i, attraction){
		var cardDiv = ' <div role="main" class="ui-content" data-inset="false"> \
                    	<div class="nd2-card"> \
	                        <div class="card-title has-avatar"> \
                            	<h3 class="card-primary-title nearby-loc-header">'+attraction.name+'</h3> \
                        	</div>\
                        	<div class="card-media nearby-loc-image">\
	                            <img src="'+attraction.imageUrl+'">\
                        	</div>\
                        	<div class="card-supporting-text has-action nearby-loc-description">'+attraction.description +'\
                        	</div>\
                    	<div class="card-action">\
	                        <div class="row between-xs">\
                            	<div class="col-xs-4">\
	                                <div class="box">\
                                	</div>\
                            	</div>\
                            	<div class="col-xs-8 align-right">\
	                                <div class="box">\
                                    	<a href="#" class="ui-btn ui-btn-inline okay-button">Okay</a>\
                                	</div>\
                            	</div>\
                        	</div>\
                    	</div>\
                	</div>\
               </div>';
			        $('.nearby-attractions').append(cardDiv)
	});


	$.each(alldata.upcomingEvents.events, function(i, sentosa_event){
		var eventName = sentosa_event.name;
		var eventTime = sentosa_event.time;
		var eventCard = '<div class="nd2-card card-media-right card-media-small">\
					<div class="card-title">\
						<h3 class="card-primary-title">'+eventName+'</h3>\
						<h5 class="card-subtitle"> Starts at '+eventTime+'</h5>\
					</div>\
				</div>'
		$('.ongoing-events').append(eventCard);
	});

	// $('.okay-button').on("click",function(){
	// 	console.log("hi");
	// 	console.log($(this));
	// 	$(this).parents('.nd2-card').hide('slide', {direction: 'right'}, 1000);
	// });


};

beaconDataSuccess();
