var serverAddress =  'http://192.168.1.8:8080';
var showdata = {

	nattractions:true,
	nbus:true,
	nevents:true,
	nameneties:true,
	neat:true,
	nrides:true

};

var getBeaconData = function(beaconId){
	switch(beaconId){

			case 42892:
			case 20523:
								beaconId = 1;
			 					break;
			case 434:
			case 22473:
								beaconId = 2;
								break;
			case 3783:
								beaconId = 3;
							  break;
			default:
								beaconId = 1;


	}

	$.ajax({
		type: "GET",
		url: serverAddress+'/all-data/'+beaconId,
		crossDomain: true,
		success: becSuccess,
		error: function () {
			console.log("------------------------------ Ajax error ------------------------------- ");
		}
	});
};

var becSuccess = function(data){

	console.log(data);
	//Show the name
	$(".placename").html(data.bus.name);
	$("#mcwd").html(data.bus.cwd);
	$("#mainloc").show();

	if(showdata.nbus && data.bus.nbus){

		$("#nbustim").html(data.bus.nbus);
		$("#nbus").show();
	}else{
		$("#nbus").hide();
	}

	//Show the top attractions
	if(showdata.nattractions && data.nattractions && data.nattractions.length >= 1){
		var att = data.nattractions;
		var num = 0;
		$("#nattractions .attractions").html('');
		for(var i in att){
			var str = '';
			var addClass = "";
			if(att[i].ldesc){
				addClass="attsumm";
			}
			str += '<div class="attraction '+addClass+'">';
			str += '<div class="attraction-head"><span class="att-name">'+att[i].name+'</span><span class="att-loc">('+att[i].loc+' mts)</span></div>';
			str += '<div class="attraction-img">';
			str += '<img alt="Attraction Image" src=images/'+att[i].img+' width=70% height=40%/>';
			str += '</div>';
			str += '<div class="attraction-des">';
			str += att[i].sdesc;
			str += '</div>';
			str += '<div class="attraction-cwd">';
			str += 'Approx. Crowd : <span class="'+att[i].col+'">'+att[i].cwd+'</span> people';
			str += '</div>';
			str += '</div>';

			var obj = $(str);
			if(att[i].ldesc){
				obj.data("ldesc",att[i].ldesc);
			}
			$("#nattractions .attractions").append(obj);

		}
		$("#nattractions").show();
	}else{

		$("#nattractions").hide();

	}

	//Show the top events
	if(showdata.nevents && data.nevents && data.nevents.length >= 1){
		var att = data.nevents;
		$("#nevents .attractions").html('');
		for(var i in att){
			var str = '';
			var addClass = "";
			if(att[i].ldesc){
				addClass="attsumm";
			}

			str += '<div class="attraction '+addClass+'">';
			str += '<div class="attraction-head"><span class="att-name">'+att[i].name+'</span><span class="att-loc">('+att[i].loc+' mts)</span></div>';
			str += '<div class="attraction-img">';
			str += '<img alt="Attraction Image" src=images/'+att[i].img+' width=70% height=40%/>';
			str += '</div>';
			str += '<div class="attraction-des">';
			str += att[i].sdesc;
			str += '</div>';
			str += '<div class="attraction-cwd">';
			str += 'Approx. Crowd : <span class="'+att[i].col+'">'+att[i].cwd+'</span> people';
			str += '</div>';
			str += '</div>';

			var obj = $(str);
			if(att[i].ldesc){
				obj.data("ldesc",att[i].ldesc);
			}
			$("#nevents .attractions").append(obj);

		}

		$("#nevents").show();
	}else{

		$("#nevents").hide();

	}


	//Show the top ameneties
	if(showdata.nameneties && data.namenities && data.namenities.length >= 1){
		var att = data.namenities;
		var str = '';
		for(var i in att){
			str += '<div class="attraction">';
			str += '<div class="attraction-head"><span class="att-name">'+att[i].name+'</span><span class="att-loc">('+att[i].loc+' mts)</span></div>';
			str += '</div>';
		}

		$("#nameneties .attractions").html(str);
		$("#nameneties").show();
	}else{

		$("#nameneties").hide();

	}


	//Show the top places to eat
	if(showdata.neat && data.neat && data.neat.length >= 1){
		var att = data.neat;
		$("#neat .attractions").html('');

		for(var i in att){
			var str = '';
			var addClass = "";
			if(att[i].ldesc){
				addClass="attsumm";
			}
			str += '<div class="attraction '+addClass+'">';
			str += '<div class="attraction-head"><span class="att-name">'+att[i].name+'</span><span class="att-loc">('+att[i].loc+' mts)</span></div>';
			str += '<div class="attraction-img">';
			str += '<img alt="Attraction Image" src=images/'+att[i].img+' width=70% height=40%/>';
			str += '</div>';
			str += '<div class="attraction-des">';
			str += att[i].sdesc;
			str += '</div>';
			str += '<div class="attraction-tim">';
			str += 'Timings : '+att[i].tim;
			str += '</div>';
			str += '<div class="attraction-cwd">';
			str += 'Approx. Crowd : <span class="'+att[i].col+'">'+att[i].cwd+'</span> people';
			str += '</div>';
			str += '</div>';

			var obj = $(str);

			if(att[i].ldesc){
			obj.data("ldesc",att[i].ldesc);
			}

			$("#neat .attractions").append(str);

		}

		$("#neat").show();
	}else{

		$("#neat").hide();

	}


	//Show the top places to eat
	if(showdata.nrides && data.nrides && data.nrides.length >= 1){
		var att = data.nrides;
		var str = '';
		for(var i in att){

			str += '<div class="attraction">';
			str += '<div class="attraction-head"><span class="att-name">'+att[i].name+'</span><span class="att-loc">('+att[i].loc+' mts)</span></div>';
			str += '<div class="attraction-img">';
			str += '<img alt="Attraction Image" src=images/'+att[i].img+' width=70% height=40%/>';
			str += '</div>';
			str += '<div class="attraction-tim">';
			str += 'Waiting Time : <span class="'+att[i].col+'">'+att[i].tim+'</span> minutes';
			str += '</div>';
			str += '</div>';
		}

		$("#nrides .attractions").html(str);
		$("#nrides").show();
	}else{

		$("#nrides").hide();

	}



};

//getBeaconData(42892);
getBeaconData(1);
//becSuccess(42892);
