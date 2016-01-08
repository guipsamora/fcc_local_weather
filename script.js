$(document).ready(function(){

   var lat;
   var lon;
   var startPos;

   navigator.geolocation.getCurrentPosition(geoSuccess); 

   // function that  gets the position
    function geoSuccess(position) {
       startPos = position;
       document.getElementById('startLat').innerHTML = startPos.coords.latitude;
       lat = startPos.coords.latitude;
       document.getElementById('startLon').innerHTML = startPos.coords.longitude;
       lon = startPos.coords.longitude;
    };

    // function that calls the API
   function search(){
      lat = lat.toFixed(2);
      lon = lon.toFixed(2);
      $.ajax({
           url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=354716533cebbb1c899e3b3fb3814a54",
           data: "json",
           dataType: 'jsonp',
           type: 'GET',
           headers: { 'Api-User-Agent': 'Example/1.0' },
           success: function(data) {
             console.log(data)
            //    for (var i = 0; i < extracts.length; i++) {
            //    $("#flex-container").append("<a target=\"_blank\" href=\" "+ urls[i] + "\"><div class=\"flex-item resultbox" + i + "\"></div></a>");
            //    $(".resultbox" + i + "").append("<h1 class=\"headline\">" + titles[i] + "</h1>");
            //    $(".resultbox" + i + "").append("<p class=\"extract\">" + extracts[i] + "</p>");
           }
           
      });
   }

   $("#weather").click(function(){
      search();
   })

})





