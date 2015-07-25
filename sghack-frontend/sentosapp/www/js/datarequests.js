var serverAddress =  'http://172.20.205.194:8080'

// Remove these on AJAX success
var beacon1AttractionData ='{"nearestAttractionsList":[{"name":"Marine Life Park","latitude":26269.24,"longitude":26811.96,"description":"Marine Life Park is a part of Resorts World Sentosa, Sentosa, situated in southern Singapore. The 8-hectare park houses two attractions, the S.E.A Aquarium and the Adventure Cove Waterpark, and features the largest oceanarium in the world.","imageUrl":"http://mlp.rwsentosablog.com/wp-content/uploads/2012/11/MLP-S.E.A.-Aquarium-Students-in-Shipwreck-Tunnel.jpg"},{"name":"Maritime Experimental Museum","latitude":26570.71,"longitude":26773.8,"description":"The Maritime Experiential Museum, formerly the Maritime Xperiential Museum and the Maritime Experiential Museum & Aquarium, is a museum in Resorts World Sentosa, Sentosa, Singapore, built to house the Jewel of Muscat and some of the 60,000 artefacts salvaged from the Belitung shipwreck, an Arabian dhow wrecked off the coast of Belitung Island.","imageUrl":"https://upload.wikimedia.org/wikipedia/commons/d/d9/Maritime_Experiential_Museum_%26_Aquarium,_Resorts_World_Sentosa,_Singapore_-_20120102.jpg"},{"name":"Equarius water park","latitude":26288.36,"longitude":26683.15,"description":"Aquatic amusement park with an aquarium, waterslides, a wave pool, tubing, snorkeling & more.","imageUrl":"http://4.bp.blogspot.com/-ytuLh_3rCzg/TyqxA58BVcI/AAAAAAAAMX0/wRh5JmzLMKo/s640/18+Taking+a+Daytime+Ride+on+Singapore+Cable+Car+%2540+The+Jewel+Box+%255BMount+Faber%255D%252C+Singapore+%2528Large%2529.jpg"}]}'
beacon1AttractionData = JSON.parse(beacon1AttractionData);

var beacon1EventData = '{"events":[{"name":"Wings of time","time":"19:40:00","location":{"name":"Wings of time","latitude":26199.99,"longitude":26004.0,"description":"","imageUrl":null}}]}'
beacon1EventData = JSON.parse(beacon1EventData);

var getBeaconData = function(beaconId){
	$.ajax({
		type: "GET",
		url: serverAddress+'/nearest-attractions/beacon'+beaconId,
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
	$.each(beacon1AttractionData.nearestAttractionsList, function(i, attraction){
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
                                    	<a href="#" class="ui-btn ui-btn-inline">Okay</a>\
                                	</div>\
                            	</div>\
                        	</div>\
                    	</div>\
                	</div>\
               </div>'

        $('.nearby-attractions').append(cardDiv)
	});


	$.each(beacon1EventData.events, function(i, sentosa_event){
		var eventName = sentosa_event.name;
		var eventTime = sentosa_event.time;
		var eventCard = '<div class="nd2-card card-media-right card-media-small">\
					<div class="card-title">\
						<h3 class="card-primary-title">'+eventName+'</h3>\
						<h5 class="card-subtitle">'+eventTime+'</h5>\
					</div>\
				</div>'
		$('.ongoing-events').append(eventCard);
	});

	// console.log(beacon1AttractionData.nearestAttractionsList[0].name);
	// console.log(beacon1AttractionData.nearestAttractionsList[0].latitude);
	// console.log(beacon1AttractionData.nearestAttractionsList[0].description)
};

beaconDataSuccess();