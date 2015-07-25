var getBeaconData = function(beaconId){
	console.log('Shantanu is here--------------------------------------------- Shantanu');
	console.log('SID is here--------------------------------------------- sid');
	$.ajax({
		type: "GET",
		url: 'http://172.20.205.194:8080/nearest-attractions/beacon2',
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
	console.log("--------------------------------Is is namsuccess ------------------------");
	console.log(result.nearestAttractionsList[0].name);
};

getBeaconData(2);
