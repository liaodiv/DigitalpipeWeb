/**
 * Created by 27353 on 2017/6/14.
 */

var ol=require("openlayers")
require('../node_modules/openlayers/css/ol.css')
require('./index.css')

/*var map = new ol.Map({
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
}*/
/////////////////////////////////////////////////////修改by郑欣彤//////////////////////
var layers=new Array();

layers[1] =   new ol.layer.Vector({
    name: '污水线',
    visable:true,
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'http://localhost:8080/geoserver/wfs?' +
        'service=wfs&version=1.0.0&' +
        'request=GetFeature&' +
        'typeNames=GIS_DATA:污水线&' +
        'outputFormat=application/json&' +
        'srsname=EPSG:4326'
    }),
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#444444',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#444444',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#444444'
                })
            })
        });
    }
})


layers[0] = new  ol.layer.Tile({
    name: '地图',
    visible: true,
    source: new ol.source.OSM()
})

layers[2] =   new ol.layer.Vector({
    name: '污水检修点',
    visable:true,
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'http://localhost:8080/geoserver/wfs?' +
        'service=wfs&version=1.0.0&' +
        'request=GetFeature&' +
        'typeNames=GIS_DATA:污水_2&' +
        'outputFormat=application/json&' +
        'srsname=EPSG:4326'
    }),
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#2D5B37',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#2D5B37',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#2D5B37'
                })
            })
        });
    }
})

var map = new ol.Map({
    layers: layers,
    target: 'map',
    view: new ol.View({
        center: [12734150,3570900],
        zoom: 17
    })
});

window.map = map;   ///map导入全局变量
var addcontrol=require('./LayerControl');
addcontrol(map,'LayerControl');
///////////点击响应////////////
var interaction;
map.removeInteraction(interaction);
interaction = new ol.interaction.Select();
map.addInteraction(interaction);
interaction.on('select',function (e) {
    console.log(e.selected[0].getKeys());
    console.log(e.selected)
    //addtable(e.selected);
    // console.log(e.target.getFeature());
})
/**
 * select and edit
 * */
var featureRequest = new ol.format.WFS().writeGetFeature({
    srsName: 'EPSG:4326',                  ///参照系
    featureNS: 'GIS_DATA', ///命名空间URI
    featurePrefix: 'postdata',             //
    featureTypes: ['污水线'],           ///图层名
    outputFormat: 'application/json',
    filter:
        ol.format.filter.equalTo('continent', '亚洲')
});

var select=require('./selectZheng.js');







