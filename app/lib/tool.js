/**
 * Created by DELL on 2017/6/23.
 */
var editsource=new ol.source.vector({});
var selectInteraction = new ol.interaction.Select();

var dragBox = new ol.interaction.DragBox({
    condition: ol.events.condition.platformModifierKeyOnly
});//框选图层

var selectedFeatures = select.getFeatures();//已选要素存储地




$('toolbar').on('click',function (event) {
    var id=event.target.id;
    switch(id)
    {
        case "select":
            map.removeInteraction(selectInteraction);
            map.addInteraction(selectInteraction);
            break;
        case "dragBox":
            map.removeInteraction(selectInteraction);
            map.addInteraction(selectInteraction);
            map.removeInteraction(dragBox);
            map.addInteraction(dragBox);
            break;
        case "addMarker":
            break;
        default:
            break;
    }
})
///////////////点击查询代码//////////////////////////////
selectInteraction.on('select',function (e) {
    addtable(e.selected);
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

/////////////////////////////框选查询代码///////////////////////////////
dragBox.on('boxend', function() {
    // features that intersect the box are added to the collection of
    // selected features
    var extent = dragBox.getGeometry().getExtent();
    editsource.forEachFeatureIntersectingExtent(extent, function(feature) {
        selectedFeatures.push(feature);
    });
    addtable_box(selectedFeatures);
});

// clear selection when drawing a new box and when clicking on the map
dragBox.on('boxstart', function() {
    selectedFeatures.clear();
});

function addtable_box(data)
{
    $('#createtablle').empty();
    var div = $("#createtablle");
    div.empty();
    div.css("display","block");
    var table=$("<table border=\"1\" class='table_content'>");
    table.appendTo($("#createtablle"));
    //var rowCount=data.length;
    var tr=$("<tr></tr>");
    tr.appendTo(table);
    var data_array=data.getArray();
    //var key=data.getKeys();
    var key = data_array[0].getKeys();
    var rowCount=data_array.length;
    for(var ti in key)
        if(key[ti] != "geometry"){
            var td=$("<td>"+key[ti]+"</td>");
            td.appendTo(tr);
        }
    for(var i=0;i<rowCount;i++)
    {
        var tname = data_array[i];
        var tname = tname.getProperties();
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





