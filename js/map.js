
var per = "";
var variab=0;

  

var dojoConfig = {
  has:{
    "esri-featurelayer-webgl": 1
  }
};
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
          alert(nombrePersonaje);
          
        });
      });
       
         var myFunction= function(){
          
        }

       
       
      /*document.getElementsByClassName('periodic-element')[1].addEventListener('click', function (event) {
            // do something
      
            //debugger;
            map.remove(tileLayer);
      

            var arreglo = ["https://www.arcgis.com/sharing/rest/content/items/2f00e863b8f446fb8ad1a613d21b56ce/resources/styles/root.json", "https://www.arcgis.com/sharing/rest/content/items/f4292dec0d6546b88cb0b14ed11a27fd/resources/styles/root.json", "https://www.arcgis.com/sharing/rest/content/items/87f5276a633e412287a30c74ea00d3c2/resources/styles/root.json", "http://angpezam.maps.arcgis.com/sharing/rest/content/items/cba6e359a8724790aecea9e0aa28345f/resources/styles/root.json", "http://angpezam.maps.arcgis.com/sharing/rest/content/items/54e25f548fc949ae852ed36b4a65fbb8/resources/styles/root.json"]; 
            var i = getRandomInt(4);
            var tileLayerA = new VectorTileLayer({
           // URL to the vector tile service
              url: arreglo[i]
             });  
            map.add(tileLayerA);
            map.add(featureLayer);
              per = event.currentTarget.attributes["data-description"].nodeValue;
              console.log (per);
            

            if (per == "Panda") {

              document.getElementById("nombre").innerHTML = "Panda";
              document.getElementById("origen").innerHTML = "China";
              document.getElementById("edad").innerHTML = "9";
              document.getElementById("enemigos").innerHTML = "Kuma";
              document.getElementById("lucha").innerHTML = "Kuma Shinken";
              document.getElementById("apariciones").innerHTML = "Tekken 3, 4, 5, 5: Dark Resurrection, 6, 6: Bloodline Rebellion";

            }




  
        });*/

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

});




