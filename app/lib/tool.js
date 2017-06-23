/**
 * Created by DELL on 2017/6/23.
 */
var selectInteraction = new ol.interaction.Select();
$('toolbar').on('click',function (event) {
    var id=event.target.id;
    switch(id)
    {
        case "select":
            map.removeInteraction(selectInteraction);
            map.addInteraction(selectInteraction);
            break;
        default:
            break;
    }
})

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



