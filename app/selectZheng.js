/**
 * Created by DELL on 2017/6/21.
 */
//z在这里写吧
/////////////////////////////////////点击获取数据////////////////////////////////
/**
 * select and edit
 * */

var ol=require("openlayers");   ///引入openlayers就行

if(!window.map){               //引入map全局变量
    console.log("map不存在")
}else {
    var map = window.map;
}

var featureRequest = new ol.format.WFS().writeGetFeature({
    srsName: 'EPSG:4326',                  ///参照系
    featureNS: 'GIS_DATA', ///命名空间URI
    featurePrefix: 'postdata',             //
    featureTypes: ['污水线'],           ///图层名
    outputFormat: 'application/json',
});

function select() {
    console.log("it start");
    fetch('http://localhost:8080/geoserver/wfs', {
        method: 'POST',
        body: new XMLSerializer().serializeToString(featureRequest)
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        var features = new ol.format.GeoJSON().readFeatures(json);
        console.log(features);
        addtable(features);
   });
    console.log("it start");
    return false;
}
function addtable(data)
{
    $('#createtablle').empty();
    var div = $("#createtablle");
    div.empty();
    div.css("display","block");
    var table=$("<table border=\"1\" class='table_content'>");
    table.appendTo($("#createtablle"));
    var rowCount=data.length;
    var tr=$("<tr></tr>");
    tr.appendTo(table);
    var key = data[0].getKeys();
    for(var ti in key)
        if(key[ti] != "geometry"){
            var td=$("<td>"+key[ti]+"</td>");
            td.appendTo(tr);
        }
    for(var i=0;i<rowCount;i++)
    {
        var tname = data[i];
        tname = tname.getProperties();
        var tr=$("<tr></tr>");
        tr.appendTo(table);
        for(var value in tname)
            if (value != "geometry") {
                var td = $("<td>" + tname[value] + "</td>");
                td.appendTo(tr);
            }
    }
    tr.appendTo(table);
    $("#createtablle").append("</table>");
}
module.exports=select;