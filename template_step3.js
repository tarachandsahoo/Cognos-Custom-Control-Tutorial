//Step 1 Add reference tp MapBox API, and to jQuery API, then add variables to be used 
//Step 2 Add Initialize Code and set up default map. Make sure to add Map Token Key
//Step 2a Make some minor adjustments to default map, and setup Bounds Variable
//Step 3 Get and Manipulate data in SetData Function


define(["https://api.tiles.mapbox.com/mapbox-gl-js/v0.29.0/mapbox-gl.js", "jquery"], function(mapboxgl, jquery) {
    "use strict";
    var map = '',
        bounds = '',
        geojsonFeature = {};

    function BasicControl() {};



    BasicControl.prototype.initialize = function(oControlHost, fnDoneInitializing, oDataStore) {

        jQuery("head link[rel='stylesheet']").last().after("<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.34.0/mapbox-gl.css' rel='stylesheet' />");


        var mapContainer = oControlHost.container.id;

        //*** Step 2a make some minor adjustments to default map */
        mapboxgl.accessToken = ''; //Make sure to add Map Token Key
        var map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-96, 37.8], //Update Map Center to mid US
            zoom: 3, //Change Default Zoom
            interactive: true //Set Interactive to true
        });

        //Set up the Bounds variable
        bounds = new mapboxgl.LngLatBounds();

        //Tell Cognos that we are done initializing 
        fnDoneInitializing();

    };


    BasicControl.prototype.draw = function(oControlHost) {

        console.log('Draw ******************')

    };


    BasicControl.prototype.setData = function(oControlHost, oDataStore) {
        console.log('2 Set Data')
            //Default GeoJSON
        geojsonFeature = {
            "type": "FeatureCollection",
            "features": []
        }

        var iRowCount = oDataStore.rowCount;
        for (var iRow = 0; iRow < iRowCount; iRow++) {

            var feature = {}
            feature['type'] = 'Feature'
            feature['geometry'] = {
                'type': 'Point',
                'coordinates': [parseFloat(oDataStore.getCellValue(iRow, 1)), parseFloat(oDataStore.getCellValue(iRow, 2))],
            }
            feature['properties'] = { 'name': oDataStore.getCellValue(iRow, 0) }
            geojsonFeature['features'].push(feature)
        }

        console.log(geojsonFeature)

    };



    return BasicControl;
});