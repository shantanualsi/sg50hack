var est  = {

  lastClosestBec : 0,

  startListening : function(){

    estimote.beacons.requestAlwaysAuthorization();
    estimote.beacons.startRangingBeaconsInRegion(
         {}, // Empty region matches all beacons.
        this.onRange,
        this.onError);
  },

  onRange : function(becInfo){

    // Sort beacons by distance.
    becInfo.beacons.sort(function(beacon1, beacon2) {
      return beacon1.distance > beacon2.distance; });


    console.log("------------------Beacon---------------------------");

    if(becInfo.beacons && becInfo.beacons[0]){

        if(becInfo.beacons[0].major != this.lastClosestBec){
          console.log("------------------Beacon is ----------- "+becInfo.beacons[0].major);

          this.lastClosestBec = becInfo.beacons[0].major;

          getBeaconData(this.lastClosestBec);


        }

    }


    console.log("---------------Found on Range ---------------- ");

  },
  onError : function(err){
    alert("Error Occured "+err);
    console.log("Error Occured "+ err);

  }

};
