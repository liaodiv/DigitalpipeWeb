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
    var table=$("<table border=\"1\">");
    table.appendTo($("#createtablle"));
    var rowCount=data.length;

    var tr=$("<tr></tr>");
    tr.appendTo(table);
    var td=$("<th>编号</th>");
    td.appendTo(tr);
    var td=$("<th>上一次检查时间</th>");
    td.appendTo(tr);
    var td=$("<th>位置</th>");
    td.appendTo(tr);
    var td=$("<th>状况</th>");
    td.appendTo(tr);

    for(var i=0;i<rowCount;i++)
    {
        var tr=$("<tr></tr>");
        tr.appendTo(table);
        var td=$("<td>"+data[i].S.Id+"</td>");
        td.appendTo(tr);
        var td=$("<td>"+data[i].S["上一次检查"]+"</td>");
        td.appendTo(tr);
        var td=$("<td>"+data[i].S["位置"]+"</td>");
        td.appendTo(tr);
        var td=$("<td>"+data[i].S["状况"]+"</td>");
        td.appendTo(tr);
    }
    tr.appendTo(table);
    $("#createtablle").append("</table>");
}
module.exports=select;