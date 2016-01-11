$(document).ready(function(){

   var lat, lon, startPos, temp;

   // calls the getCurrentPosition method to the browser
   navigator.geolocation.getCurrentPosition(success); 

   // object that contains the keys(weather type) and the respective images(URL)
    var photos = {
      "snow" : "https://images.unsplash.com/photo-1452037399795-f31eb853132b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=16b8b58981bcbe8de689c5061d245205",
      "cold" : "https://images.unsplash.com/photo-1432057322224-8916b9ed202a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=96ba854e20bae187d58f5a150ef331f6",
      "clouded" : "https://images.unsplash.com/photo-1451914532720-521f23b7dedb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=308ce0cbcdcadc1ad7776386d65adcb0",
      "clouded_2" : "https://images.unsplash.com/photo-1451904062328-43bf574e79ce?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=2487716a83b52472dc4062566ea433d2",
      "chilly" : "https://images.unsplash.com/photo-1451903978882-b165bd94e45d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=0fc094d59ffa7866003f33d5379d231e",
      "sunny" : "https://images.unsplash.com/photo-1452088978799-d668ea9d07a6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=bffa47c894e8a696e4a1b22c59f31489",
      "warm" : "https://images.unsplash.com/reserve/2kdUCcTLROKosAbSM6N9_IMG_0878.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=81914a779f01d481c3f320871528ae2a",
      "hot" : "https://images.unsplash.com/reserve/ClwMljf1RN6Ge8ApETD1_P1000851.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=b87d2d11f62dafe7edcdfff8e35e7fcc",
    }

    // function that  gets the position in latitude and longitude and assign it to the variables
   function success(position){
      startPos = position;
      lat = startPos.coords.latitude;
      lon = startPos.coords.longitude;

      lat = lat.toFixed(2);
      lon = lon.toFixed(2);

      // function that calls the API
      $.ajax({
           url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=354716533cebbb1c899e3b3fb3814a54",
           data: "json",
           dataType: 'jsonp',
           type: 'GET',
           headers: { 'Api-User-Agent': 'Example/1.0' },
           success: function(data) {
               temp = "celsius";

               dataGlob = data

               data.fahrenheit = +(data.main.temp * 9/5 - 459.67).toFixed(2);
               data.celsius = +(data.main.temp - 273.15).toFixed(2);

               

               if (data.celsius < 0 ){ 
                 $("body").css("backgroundImage", "url\(" + photos.snow +")");
               } else if(data.celsius > 0 || data.weather[0].main === "Clouds"){
                 $("body").css("backgroundImage", "url\(" + photos.clouded +")");
               } else if(data.celsius > 0 && data.celsius <= 15){
                 $("body").css("backgroundImage", "url\(" + photos.cold +")");
               } else if(data.celsius > 15 && data.celsius <= 25){
                 $("body").css("backgroundImage", "url\(" + photos.chilly +")");
               } else if(data.celsius > 25 && data.celsius < 30){
                 $("body").css("backgroundImage", "url\(" + photos.sunny +")");
               } else if(data.celsius > 30){
                 $("body").css("backgroundImage", "url\(" + photos.hot +")");
               }

               document.getElementById('place').innerHTML = "Weather in " + data.name;
               document.getElementById('temperature').innerHTML = "Temperature: " + data.celsius + " ºC";
               document.getElementById('descr').innerHTML =  data.weather[0].main;

               $("#fahrenheit").click(function(){
                  document.getElementById('temperature').innerHTML = "Temperature: " + data.fahrenheit + " ºF";
               })
               $("#celsius").click(function(){
                  document.getElementById('temperature').innerHTML = "Temperature: " +  data.celsius + " ºC";
               })
              
               console.log(data)
           }
           
      });
   }
});