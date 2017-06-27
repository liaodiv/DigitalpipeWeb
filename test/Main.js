var layer = new Array();  //map中的图层数组
var layerName = new Array();  //图层名称数组
var layerVisibility = new Array();  //图层可见属性数组

/**
 * 加载图层列表数据
 * @param {ol.Map} map 地图对象
 * @param {string} id 图层列表容器ID
 */
function loadLayersControl(map, id) {
    var treeContent = document.getElementById(id); //图层目录容器

    var layers = map.getLayers(); //获取地图中所有图层
    for (var i = 0; i < layers.getLength(); i++) {
        //获取每个图层的名称、是否可见属性
        layer[i] = layers.item(i);
        layerName[i] = layer[i].get('name');
        layerVisibility[i] = layer[i].getVisible();

        //新增li元素，用来承载图层项
        var elementLi = document.createElement('li');
        treeContent.appendChild(elementLi); // 添加子节点
        //创建复选框元素
        var elementInput = document.createElement('input');
        elementInput.type = "checkbox";
        elementInput.name = "layers";
        elementLi.appendChild(elementInput);
        //创建label元素
        var elementLable = document.createElement('label');
        elementLable.className = "layer";
        //设置图层名称
        setInnerText(elementLable, layerName[i]);
        elementLi.appendChild(elementLable);

        //设置图层默认显示状态
        if (layerVisibility[i]) {
            elementInput.checked = true;
        }
        addChangeEvent(elementInput, layer[i]);  //为checkbox添加变更事件
    }
}
/**
 * 为checkbox元素绑定变更事件
 * @param {input} element checkbox元素
 * @param {ol.layer.Layer} layer 图层对象
 */
function addChangeEvent(element, layer) {
    element.onclick = function () {
        if (element.checked) {
            layer.setVisible(true); //显示图层
        }
        else {
            layer.setVisible(false); //不显示图层
        }
    };
}
/**
 * 动态设置元素文本内容（兼容）
 */
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}
/*****图层导入****/
var map_layers=new Array();
var map_layers_source=new Array();

map_layers_source[1]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://localhost:8080/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=GIS_DATA:污水线&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:4326'
});

map_layers_source[2]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://localhost:8080/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=GIS_DATA:污水_2&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:4326'
});

map_layers[1] =   new ol.layer.Vector({
    name: '污水线',
    visable:true,
    source:map_layers_source[1],
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


map_layers[0] = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
    }),
    name:'谷歌地图',
    visible:true
});

map_layers[2] =   new ol.layer.Vector({
    name: '污水检修点',
    visable:true,
    source: map_layers_source[2],
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
    layers: map_layers,
    target: 'map',
    view: new ol.View({
        center: [12734150,3570900],
        zoom: 17
    })
});
loadLayersControl(map, "layerTree");
/*******************************点击查询**************************************/
var selectInteraction = new ol.interaction.Select();

$('#click_query').on('click',function () {
    map.removeInteraction(selectInteraction);
    map.addInteraction(selectInteraction);
})

selectInteraction.on('select',function (e) {
    addtable(e.selected);
})

function addtable(data)
{
    var div = $("#selectTable");
    div.empty();
    var table=$("<table class='table table-property'></table>");
    table.appendTo($("#selectTable"));
    var rowCount=data.length;
    var thead=$("<thead></thead>");
    thead.appendTo(table);
    var tr=$("<tr></tr>");
    tr.appendTo(thead);
    var key = data[0].getKeys();
    for(var ti in key){
        if(key[ti] != "geometry"){
            var td=$("<th>"+key[ti]+"</th>");
            td.appendTo(tr);
        }
    }
    var tbody=$("<tbody></tbody>");
    tbody.appendTo(table);
    for(var i=0;i<rowCount;i++)
    {
        var tname = data[i];
        tname = tname.getProperties();
        var tr=$("<tr></tr>");
        tr.appendTo(tbody);
        for(var value in tname)
            if (value != "geometry") {
                var td = $("<td>" + tname[value] + "</td>");
                td.appendTo(tr);
            }
    }
    tr.appendTo(tbody);
}

/*****************拉框查询********************/
var dragBox = new ol.interaction.DragBox({
    condition: ol.events.condition.platformModifierKeyOnly
});//框选图层

var editsource=map_layers_source[1];

var selectedFeatures = selectInteraction.getFeatures();//已选要素存储地

$('#square_query').on('click',function () {
    map.removeInteraction(selectInteraction);
    map.addInteraction(selectInteraction);
    map.removeInteraction(dragBox);
    map.addInteraction(dragBox);
})

dragBox.on('boxend', function() {
    var extent = dragBox.getGeometry().getExtent();
    editsource.forEachFeatureIntersectingExtent(extent, function(feature) {
        selectedFeatures.push(feature);
    });
    addtable_box(selectedFeatures);
});

dragBox.on('boxstart', function() {
    selectedFeatures.clear();
});

function addtable_box(data)
{
    var div = $("#selectTable");
    div.empty();
    div.css("display","block");
    var table=$("<table class='table table-property'></table>");
    table.appendTo($("#selectTable"));
    var thead=$("<thead></thead>");
    thead.appendTo(table);
    var tr=$("<tr></tr>");
    tr.appendTo(thead);
    var data_array=data.getArray();
    var key = data_array[0].getKeys();
    var rowCount=data_array.length;
    for(var ti in key)
        if(key[ti] != "geometry"){
            var td=$("<th>"+key[ti]+"</th>");
            td.appendTo(tr);
        }
    var tbody=$("<tbody></tbody>");
    tbody.appendTo(table);
    for(var i=0;i<rowCount;i++)
    {
        var tname = data_array[i];
        var tname = tname.getProperties();
        var tr=$("<tr></tr>");
        tr.appendTo(tbody);
        for(var value in tname)
            if (value != "geometry") {
                var td = $("<td>" + tname[value] + "</td>");
                td.appendTo(tr);
            }
    }
    tr.appendTo(tbody);
}
/************************布置任务****************************/
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
        src: '../img/marker.png' //图标的url
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

function addTask(data)
{
    var div = $("#task_table");
    div.empty();
    var table=$("<table class='table'></table>");
    table.appendTo($("#task_table"));
    var rowCount=data.length;
    var thead=$("<thead></thead>");
    thead.appendTo(table);
    var tr=$("<tr></tr>");
    tr.appendTo(thead);
    for(var j=0;j<rowCount;j++)
    {
        if(data[j]!=null)
        {
            var key = data[j].getKeys();
            for(var ti in key) {
                if(key[ti] != "geometry"){
                    var td = $("<th>" + key[ti] + "</th>");
                    td.appendTo(tr);
                }
            }
            break;
        }
    }
    if(j==rowCount)
        return;
    var td = $("<th>删除任务</th>");
    td.appendTo(tr);
    var tbody=$("<tbody></tbody>");
    tbody.appendTo(table);
    for(var i=0;i<rowCount;i++) {
        if (data[i] != null) {
            var tname = data[i];
            tname = tname.getProperties();
            var tr = $("<tr></tr>");
            tr.appendTo(tbody);
            for (var value in tname) {
                if (value != "geometry") {
                    var td = $("<td>" + tname[value] + "</td>");
                    td.appendTo(tr);
                }
            }
            var id = tname["id"];
            var td = $("<td><a href='#' onclick='deleteTask(" + id + ")'>删除</a></td>");
            td.appendTo(tr);
        }
        tr.appendTo(tbody);
    }
}

function deleteTask(id)
{
    markerSource.removeFeature(data[id]);
    data[id]=null;
    addTask(data);
}

var getclickPoint=function(e)
{
    point=e.coordinate;
    document.getElementById("task_panel").style.display='block';
}

$('#task_arrange').on('click',function () {
    map.on('click',getclickPoint);
})

$('#task_send').on('click',function(){
    map.un('click',getclickPoint);
})

$('#task_submit').on('click',function () {
    var pipe_type=document.getElementById("task_type").value;
    var search_reason=document.getElementById("task_reason").value;
    var time=document.getElementById("task_time").value;
    var newfeature=new ol.Feature({
        geometry:new ol.geom.Point(point),
        id:i,
        type:pipe_type,
        reason:search_reason,
        time:time
    });
    data.push(newfeature);
    newfeature.setStyle(lablestyle);
    addTask(data);
    markerSource.addFeature(newfeature);
    document.getElementById("task_panel").style.display='none';
    i++;
})

$('#task_panel_close').on('click',function () {
    document.getElementById("task_panel").style.display='none';
})



