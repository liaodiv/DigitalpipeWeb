/**
 * Created by 27353 on 2017/6/14.
 */

var ol=require("openlayers")
require('../node_modules/openlayers/css/ol.css')
require('./index.css')

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            title:"mk",
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
    })
});

window.map = map;   ///map导入全局变量



console.log(map);

var addcontrol=require('./LayerControl');
addcontrol(map,'LayerControl')

var k=2;
console.log(k);

if(!$){
   console.log("jquery不存在");
}else {
    console.log("存在");
}




