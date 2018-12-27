
var per = "";
var variab=0;
var nombre;
var origen= "";
var edad= "";
var enemigos= "";
var lucha= "";
var apariciones= "";
var lon=0;
var lat=0;
var video= "";
         
  


function getRandomInt(max) {
 return Math.floor(Math.random() * Math.floor(max));
}



require([
  "esri/views/MapView",
  "esri/Map",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/Bookmarks",
  "esri/widgets/Home",
  "esri/core/lang",
  "esri/core/promiseUtils",
  "esri/core/watchUtils",
  "esri/layers/VectorTileLayer",
  "esri/layers/FeatureLayer"
  
], function(
  MapView, Map, Legend, Expand, Bookmarks, Home,lang, promiseUtils,
  watchUtils,VectorTileLayer,FeatureLayer
  ){
       var xx = document.getElementsByClassName("periodic-element");

       Array.from(xx).forEach(function(element) {
        //console.log(element);
        element.addEventListener('click', function (event) {
          //console.log(event.currentTarget.attributes[1].nodeValue);
          var nombrePersonaje = this.getAttribute("data-description");
          queryLayer(nombrePersonaje);

          map.removeAll();
          //map.remove(tileLayerA);
          //map.remove(tileLayer);
          //map.remove(featureLayer);

          view.goTo({
              center: [lon, lat],
              zoom: 4.5
          })
          
          var arreglo = ["https://www.arcgis.com/sharing/rest/content/items/2f00e863b8f446fb8ad1a613d21b56ce/resources/styles/root.json", "https://www.arcgis.com/sharing/rest/content/items/f4292dec0d6546b88cb0b14ed11a27fd/resources/styles/root.json", "https://www.arcgis.com/sharing/rest/content/items/87f5276a633e412287a30c74ea00d3c2/resources/styles/root.json", "http://angpezam.maps.arcgis.com/sharing/rest/content/items/cba6e359a8724790aecea9e0aa28345f/resources/styles/root.json", "http://angpezam.maps.arcgis.com/sharing/rest/content/items/54e25f548fc949ae852ed36b4a65fbb8/resources/styles/root.json"]; 
          var arreglo2= ["Duomo Di Sirio", "Kinder Gym", "Brimstone & Fire", "Abandoned Temple", "Geometric Plane"]  
            var i = getRandomInt(5);
            var tileLayerA = new VectorTileLayer({
           // URL to the vector tile service
              url: arreglo[i]
             });
            var escenario= arreglo2[i]
            map.add(tileLayerA);
            map.add(featureLayer);


              document.getElementById("nombre").innerHTML = nombre;
              document.getElementById("origen").innerHTML = origen;
              document.getElementById("edad").innerHTML = edad;
              document.getElementById("enemigos").innerHTML = enemigos;
              document.getElementById("lucha").innerHTML = lucha;
              document.getElementById("apariciones").innerHTML = apariciones;  
              document.getElementById("escenario").innerHTML = escenario;
              document.getElementById("video").src = video;
        }); 
      });

  var map = new Map();

  var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-98.5795, 39.8282],
        zoom: 3,
      });

  var tileLayer = new VectorTileLayer({
  // URL to the vector tile service
  url: "https://www.arcgis.com/sharing/rest/content/items/87f5276a633e412287a30c74ea00d3c2/resources/styles/root.json"
  });  
    map.add(tileLayer); 
  
  var featureLayer = new FeatureLayer({
          url: "http://geoapps.esri.co/arcgis/rest/services/Tekken/Personajes/MapServer/0"
        });

        map.add(featureLayer);


  var homeButton = new Home({
    view: view
  });
  view.ui.add(homeButton, "top-right");
//  ====================================================================================================================
  function getValues(response) {
          nombre= response.features[0].attributes.Personaje;
          origen= response.features[0].attributes.Origen;
          edad= response.features[0].attributes.Edad;
          enemigos= response.features[0].attributes.Enemigos;
          lucha= response.features[0].attributes.Estilo_de;
          apariciones= response.features[0].attributes.Aparicione;
          lon= response.features[0].attributes.Longitud;
          lat= response.features[0].attributes.Latitud;
          video= response.features[0].attributes.Video;
        }

  function queryLayer(nombrePersonaje){
    var query = featureLayer.createQuery();
query.where = "Personaje = '"+nombrePersonaje+"'";
query.outFields = [ "*"];

featureLayer.queryFeatures(query)
  .then(function(response){
   getValues(response);
   
   });
  }
        

});




