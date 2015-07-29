var app = (function(){

    var mapCenter = "26456.41309436758,26349.724355403632",
        levelNumber = 5,
        currOverlay = 0,
        maxOverlay = 3,
        currMsg = 0,
        maxMsg = 3,
        mymap;// = new GetOneMap('map', 'SM', { level: levelNumber, center: mapCenter });

    var database = {

      1:{
        "tot":565,
        "pl":"Universal Studios",
        "plcwd":102
      },
      2:{
        "tot":783,
        "pl":"Sea Aquarium",
        "plcwd":154
      },
      3:{
        "tot":1002,
        "pl":"Siloso Beach",
        "plcwd":231
      },

    };

    var msgDB = {

      1:"Bus broke down at Siloso Road near Imbiah Station.",
      2:"Heavy crowd at Imbiah Station",
      3:"Theft reported at Universal Studios"

    }

    var overlay = function() {
          clearGraphicsFromMap();
          currOverlay++;
          if(currOverlay > maxOverlay){
            currOverlay = 1;
          }
          mymap.overlayKML('/static/kml/kml'+currOverlay+'.kml');
          var data = database[currOverlay];
          $(".totVisCount").html(data.tot);
          $(".mostCrowd").html(data.pl);
          $(".plCrowdCount").html(data.plcwd);

          window.setTimeout(overlay,2500);

    },
    makePoint = function(){
      var gl = new mymap.GraphicsLayer(); ; //OneMap.GraphicsLayer();
      mymap.map.addLayer(gl);
      // var PointGraphic = generatePointGraphic("103.8191, 1.2591", "mr.gif","http://t1.onemap.sg/icons/MUSEUM/");
      // PointGraphic.attributes = {"XY":"103.8191, 1.2591"};
      // gl.add(PointGraphic);
      //     OneMap2.addLayer(XYGraphicsLayer);

          gl.clear();

          var xval = 103.8221;

          var yval = 1.2558;

          if (isNaN(xval) && isNaN(yval)) {

          }

          else {

              var XYsymbol = new _PictureMarkerSymbol(oneMapGif, 20, 20)

              var XYLocation = new _Point(xval, yval, new _SpatialReference({ wkid: 3414 }))

              var XYGraphic = new _Graphic(XYLocation, XYsymbol);

              gl.add(XYGraphic);
            }


    },

    showMessages = function(){

      currMsg++;
      if(currMsg > maxMsg){
        currMsg = 1;
      }

      $(".msg").html(msgDB[currMsg]);
      $(".msgCont").show('slow');
      window.setTimeout(showMessages,6000);

    },
    clearGraphicsFromMap = function() {
              mymap.clearGraphics();
    };


    var init = function(){

      mymap = new GetOneMap('map', 'SM', { level: levelNumber, center: mapCenter });



      window.setTimeout(overlay,1000);
      showMessages();

      $(".close").on("click",function(){$(this).parent().hide('slow')});
      //window.setTimeout(makePoint,1000);
    }


    return {

      init:init
    };

})();


$(document).ready(function(){

  app.init();

});
