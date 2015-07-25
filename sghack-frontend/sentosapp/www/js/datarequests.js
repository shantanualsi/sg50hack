var getBeaconData = function(beaconId){	
	console.log('Shantanu is here--------------------------------------------- Shantanu');
	$.ajax({
		type: "GET",
		headers:{
			"Access-Control-Allow-Origin":'*'
		},
		url: 'http://172.20.205.194:8080/nearest-attractions/beacon2',
		crossDomain: true,
		success: beaconDataSuccess,
		error: function () {
			console.err("Ajax error");
		}
	});
} 	
var beaconDataSuccess = function(result){
	console.log(result);
}


