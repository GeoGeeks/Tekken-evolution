var dojoConfig = {
  has:{
    "esri-featurelayer-webgl": 1
  }
};

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
  "esri/layers/VectorTileLayer"
  
], function(
  MapView, Map, Legend, Expand, Bookmarks, Home,lang, promiseUtils,
  watchUtils,VectorTileLayer
  ){

      document.getElementsByClassName('periodic-element ')[0]
        .addEventListener('click', function (event) {
            // do something
            var  per = event.currentTarget.attributes["data-description"].nodeValue;
            console.log (per);

            //debugger;

  
        });

  // get id person
   

  let doughnutChart, pieChartProfes, totalInscritos, universidad, totalAdmitidos, porcentajeAdmitidos, totalMatriculados,
      docentesCatedra, docentesTCompleto, docentesTMedio, porcentajeDTC, docentes;
  /************************************************************
   * Creates a new WebMap instance. A WebMap must reference
   * a PortalItem ID that represents a WebMap saved to
   * arcgis.com or an on-premise portal.
   *
   * To load a WebMap from an on-premise portal, set the portal
   * url with esriConfig.portalUrl.
   ************************************************************/
  var map = new Map();


 

  /************************************************************
   * Set the WebMap instance to the map property in a MapView.
   ************************************************************/
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
  
   
  /* Legend Expand */
  const legendExpand = new Expand({
        view: view,
        content: new Legend({
          view: view
        }),
        //expanded: view.widthBreakpoint !== "xsmall"
  });
  view.ui.add(legendExpand, "bottom-left");

  view.watch("widthBreakpoint", function(newValue) {

        legendExpand.expanded = newValue !== "xsmall";
  });
  /************************************************************/

  /* Bookmarks */

  const bookmarksWidget = new Bookmarks({
    view: view
  });

  const bookmarksExpand = new Expand({
    view: view,
    content: bookmarksWidget
  });
  view.ui.add(bookmarksExpand, "top-right");

  bookmarksWidget.on("select-bookmark", function(event) {
  bookmarksExpand.expanded = false;
  });
  /************************************************************/

  /* Home button */

  var homeButton = new Home({
    view: view
  });
  view.ui.add(homeButton, "top-right");


 //  ====================================================================================================================

  /************************************************************/
   /**
       * Create charts and start querying the layer view when
       * the view is ready and data begins to draw in the view
       */
  view.when().then(function() {
      // Create the charts when the view is ready

      console.log("capas",webmap.layers);
      const layer = webmap.layers.getItemAt(3);
      console.log("capa",layer.title);
      view.whenLayerView(layer).then(setupHoverTooltip);

      //  {
      //   watchUtils.whenFalseOnce(layerView, "updating", function(val) {
      //     // Query layer view statistics as the user clicks
      //     view.on("click", function(event) {
      //
      //       // disables navigation by pointer drag
      //       //event.stopPropagation();
      //       //console.log("EVENT",event);
      //       console.log("layerView",layerView);
      //       queryStatsOnDrag(layerView, event).then(updateCharts);
      //     });
      //
      //   });
      // });

    });
// ====================================================================================================================

  function setupHoverTooltip(layerview) {
    var promise;
    var highlight;
    var tooltipHTML;

    //var tooltip = createTooltip();
    //console.log(tooltip);

    view.on("click", function(event) {
      createCharts();
      event.stopPropagation();
      if (promise) {
          promise.cancel();
      }
      promise = view.hitTest(event.x, event.y)
          .then(function(hit) {
              promise = null;
              if (highlight) {
                  highlight.remove();
                  highlight = null;
              }
              var results = hit.results.filter(function(result) {
                  return result.graphic.layer;
              });
              if (results.length) {
                  var graphic = results[0].graphic;
                  var screenPoint = hit.screenPoint;
                  console.log(graphic.getAttribute("Name"));
                  updateCharts(graphic);

                   highlight = layerview.highlight(graphic);
                  // tooltip.show(screenPoint, tooltipHTML);

              } else {
                  //tooltip.hide();
              }
          });
      });
  }

  /**
     * Queries statistics against the layer view at the given screen location
     */
    function queryStatsOnDrag(layerView, event) {

        const query = layerView.layer.createQuery();
        console.log(view.toMap(event));

        const allStatsResponse = layerView.queryFeatures(query)
          .then(function(response) {
            console.log("reponse",response);
            const stats = response.features[0].attributes;
            return stats;
        }, function(e) {
            console.error(e);
          });

        return promiseUtils.eachAlways([allStatsResponse]);



    }





//  ====================================================================================================================

    /* createCharts */
  function createCharts() {
      totalInscritos = document.getElementById("num-inscritos");
      universidad = document.getElementById("universidad");
      totalAdmitidos = document.getElementById("num-admitidos");
      porcentajeAdmitidos = document.getElementById("porcentaje_admitidos");
      totalMatriculados = document.getElementById("num-matriculados");
      porcentajeAdmitidos = document.getElementById("porcentaje_admitidos");
      docentesTCompleto = document.getElementById("docentesTC");
      docentesTMedio = document.getElementById("docentesMT");
      docentesCatedra = document.getElementById("docentesC");
      docentes = document.getElementById("docentes");
      porcentajeDTC = document.getElementById("porcenDocentes");



      const canvasChart = document.getElementById("pie-chart");
      doughnutChart = new Chart(canvasChart.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Inscritos", "Admitidos",
            "Matriculados"
          ],
          datasets: [{
            label: "Estudiantes",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
            borderColor: "rgb(255, 255, 255)",
            borderWidth: 1,
            data: [0, 0, 0]
          }]
        },
        options: {
          responsive: true,
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Estadísticas de estudiantes de"+universidad+ "año 2017"
          }
        }
      });
//////////////////////////Gráfica de profesores/////////////////////////////
    const canvasChartProfes = document.getElementById("pie-chart-profes");
      pieChartProfes = new Chart(canvasChartProfes.getContext("2d"), {
        type: "pie",
        data: {
          labels: ["Tiempo Completo", "Medio Tiempo",
            "Cátedra"
          ],
          datasets: [{
            label: "Docentes (miles)",
            backgroundColor: ["#13a622", "#d1d523","#cd1010"],
            borderColor: "rgb(255, 255, 255)",
            borderWidth: 1,
            data: [0, 0, 0]
          }]
        },
        options: {
          responsive: true,
          cutoutPercentage: 35,
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Estadísticas de docentes de "+universidad+ "año 2017"
          }
        }
      });

    }
//  ====================================================================================================================
/**
   * Updates the charts with the data returned from the statistic queries.
   */
  function updateCharts(responses){
    console.log("responss", responses);
    // const allStats = responses[0].value;
    // console.log("updateCharts",allStats);
    //
    let insc = responses.getAttribute("Inscritos");
    let admi = responses.getAttribute("Admitidos");
    let matri = responses.getAttribute("Matriculados");
    let uni = responses.getAttribute("Name");
    let docentesTC = responses.getAttribute("Docentes_TC");
    let docentesMT = responses.getAttribute("Docentes_MT");
    let docentesC = responses.getAttribute("Docentes_C");
    let EstudiantesStats = [
          insc,
          admi,
          matri
    ];
    console.log(EstudiantesStats);
    let DocentesStats = [
          docentesTC,
          docentesMT,
          docentesC
    ];
    console.log("DOCENTES",DocentesStats);
    var porcen = (admi/insc * 100);
    porcen = porcen.toFixed(3);
    let totalDocentes = docentesTC+docentesMT+docentesC;
    var porcenDoc = (docentesTC/totalDocentes* 100);
    porcenDoc = porcenDoc.toFixed(3);
    docentesMT = (docentesMT/totalDocentes*100).toFixed(3);
    docentesC = (docentesC/totalDocentes*100).toFixed(3);
    console.log(porcenDoc);
    if (insc === undefined || docentesTC === undefined){
      totalInscritos.innerHTML = '0';
      totalAdmitidos.innerHTML = '0';
      totalMatriculados.innerHTML = '0';
      universidad.innerHTML ='x';
      porcentajeAdmitidos.innerHTML = '0';
      docentesTCompleto.innerHTML ='0';
      docentesTMedio.innerHTML ='0';
      docentesCatedra.innerHTML ='0';
      docentes.innerHTML ='0';
      porcentajeDTC.innerHTML ='0';



    }else{
      totalInscritos.innerHTML = insc.toLocaleString();
      totalAdmitidos.innerHTML = admi.toLocaleString();
      totalMatriculados.innerHTML = matri.toLocaleString();
      universidad.innerHTML =uni;
      porcentajeAdmitidos.innerHTML = porcen;
      docentesTCompleto.innerHTML =docentesTC.toLocaleString();
      docentesTMedio.innerHTML =docentesMT;
      docentesCatedra.innerHTML =docentesC;
      docentes.innerHTML = totalDocentes.toLocaleString();
      porcentajeDTC.innerHTML = porcenDoc;

    }


    updateChart(doughnutChart, EstudiantesStats, uni);
    updateChart(pieChartProfes, DocentesStats, uni);
    // // Update the total numbers in the title UI element


  }
//  ====================================================================================================================


    /**
     * Updates the given chart with new data
     */
    function updateChart(chart, dataValues, title) {
      console.log(chart.id);
      console.log("data",dataValues);
      chart.data.datasets[0].data = dataValues;
      console.log("universidad:",title);
      if(chart.id == 0){
      chart.options.title.text = "Estadísticas de estudiantes de la "+" "+title+" "+"año 2017";
      }else{
        chart.options.title.text = "Estadísticas de docentes de la "+" "+title+" "+"año 2017";

      }
      //chart.options.title.text = title;
      //console.log("chart", chart);
      chart.update();
    }

//  ====================================================================================================================



//  ====================================================================================================================
});



