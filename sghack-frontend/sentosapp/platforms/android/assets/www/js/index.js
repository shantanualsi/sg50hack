var app = {

  initialize:function(){

    this.bindEvents();
    console.log("----------------------------------Here------------------------------");


  },
  bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
      $(".infobox").on("swipeleft",this.onInfoSwipe);
      $("#settings").on("change",".chkSet",this.onSettingsChanged);
      $(".infobox").on("click",".attsumm",this.onAttractionClick);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    est.startListening();
  },
  onInfoSwipe : function(){

    console.log("Swiped");
     var blockid = $(this).attr("id"),
          chkBox = $("#chk-"+blockid);
     chkBox.get(0).removeAttribute("checked");// = false;
     $(chkBox).flipswitch("refresh");
    },
  onSettingsChanged:function(){
    console.log("Settings Changed");

    var obj = $(this),
        checked = obj.is(":checked"),
        block = obj.attr("data-block");

    if(checked === false){

      $("#"+block).hide("slow");
      showdata[block]=false;

    }else if(checked === true){

      $("#"+block).show("slow");
      showdata[block] = true;

    }

  },

  onAttractionClick : function(){

    console.log("Attraction Clicked");
    console.log();

    var htmlcont = $(this).html(),
       attObj = $(".detattraction"),
       data   = $(this).data("ldesc");

    attObj.html(htmlcont);

    attObj.find(".attraction-head").addClass("attraction-head-det");

    var obj = $('<div class="attraction-ldes">'+data+'</div>');

    attObj.find(".attraction-des").after(obj);


    $.mobile.changePage("#det",{"transition":"flip"});

  }

};
