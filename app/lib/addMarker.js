/**
 * Created by DELL on 2017/6/26.
 */
var lablestyle=new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5,60],
        anchorOrigin: 'top-right',
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        offsetOrigin: 'top-right',
        offset:[0,0],
        scale:0.4,  //图标缩放比例
        opacity: 0.75,  //透明度
        src: 'img/3.png' //图标的url
    })
});

var data=new Array();
var i=0;

var markerSource=new ol.source.Vector();

var markerLayer = new ol.layer.Vector({
    source: markerSource
});

map.addLayer(markerLayer);

var point;

var getclickPoint=function(e)
{
    point=e.coordinate;
    document.getElementById("markerset").style.display='block';
}



$('#OK').on('click',function () {
    var pipe_type=document.getElementById("pipe_type").value;
    var search_reason=document.getElementById("search_reason").value;
    var time=document.getElementById("time").value;
    var newfeature=new ol.Feature({
        geometry:new ol.geom.Point(point),
        id:i,
        type:pipe_type,
        reason:search_reason,
        time:time
    });
    data.push(newfeature);
    newfeature.setStyle(lablestyle);
    addtable(data);
    markerSource.addFeature(newfeature);
    document.getElementById("markerset").style.display='none';
    i++;
})
$('#CANCLE').on('click',function () {
    document.getElementById("markerset").style.display='none';
})

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
    for(var j=0;j<rowCount;j++)
    {
        if(data[j]!=null)
        {
            var key = data[j].getKeys();
            for(var ti in key) {
                if(key[ti] != "geometry"){
                    var td = $("<td>" + key[ti] + "</td>");
                    td.appendTo(tr);
                }
            }
            break;
        }
    }
    if(j==rowCount)
        return;
    var td = $("<td>删除任务</td>");
    td.appendTo(tr);
    for(var i=0;i<rowCount;i++) {
        if (data[i] != null) {
            var tname = data[i];
            tname = tname.getProperties();
            var tr = $("<tr></tr>");
            tr.appendTo(table);
            for (var value in tname) {
                if (value != "geometry") {
                    var td = $("<td>" + tname[vagiyue] + "</td>");
                    td.appendTo(tr);
                }
            }
            var id = tname["id"];
            var td = $("<td><a href='#' onclick='deleteTask(" + id + ")'>删除</a></td>");
            td.appendTo(tr);
        }
        tr.appendTo(table);
        $("#createtablle").append("</table>");
    }
}

function deleteTask(id)
{
    markerSource.removeFeature(data[id]);
    data[id]=null;
    addtable(data);
}

$('#test').on('click',function(){
    map.on('click',getclickPoint);
})

$('#test_1').on('click',function(){
    map.un('click',getclickPoint);
})