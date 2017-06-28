var layer = new Array();  //map中的图层数组
var layerName = new Array();  //图层名称数组
var layerVisibility = new Array();  //图层可见属性数组


var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});


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
var map_layer_point_source=new Array();

map_layers_source[1]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:gas_line&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:4326'
});

map_layers_source[2]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:waste_line&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:4326'
});

map_layers_source[3]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:electric_line&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:4326'
});

map_layers_source[4]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:water_line&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:4326'
});

map_layers_source[5]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:communication_line&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:4326'
});

map_layers_source[6]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:rain_line&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:4326'
});

map_layer_point_source[1]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:gas&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:3857'
});

map_layer_point_source[2]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:waste&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:3857'
});

map_layer_point_source[3]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:electric&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:3857'
});

map_layer_point_source[4]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:water&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:3857'
});

map_layer_point_source[5]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:communication&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:3857'
});

map_layer_point_source[6]=new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://119.23.244.169:8081/geoserver/wfs?' +
    'service=wfs&version=1.0.0&' +
    'request=GetFeature&' +
    'typeNames=DigitalWebPipe:rain&' +
    'outputFormat=application/json&' +
    'srsname=EPSG:3857'
});

map_layers[1] =   new ol.layer.Vector({
    name: '天然气巡检点',
    visable:true,
    source:map_layer_point_source[1],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#DEB887',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#DEB887',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#DEB887'
                })
            })
        });
    }
})

map_layers[2] =   new ol.layer.Vector({
    name: '天然气管网',
    visable:true,
    source:map_layers_source[1],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#DEB887',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#DEB887',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#DEB887'
                })
            })
        });
    }
})

map_layers[3] =   new ol.layer.Vector({
    name: '污水巡检点',
    visable:true,
    source:map_layer_point_source[2],
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

map_layers[4] =   new ol.layer.Vector({
    name: '污水管网',
    visable:true,
    source:map_layers_source[2],
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

map_layers[5] =   new ol.layer.Vector({
    name: '电力巡检点',
    visable:true,
    source:map_layer_point_source[3],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#BDB76B',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#BDB76B',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#BDB76B'
                })
            })
        });
    }
})

map_layers[6] =   new ol.layer.Vector({
    name: '电力网',
    visable:true,
    source:map_layers_source[3],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#BDB76B',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#BDB76B',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#BDB76B'
                })
            })
        });
    }
})

map_layers[7] =   new ol.layer.Vector({
    name: '给水巡检点',
    visable:true,
    source:map_layer_point_source[4],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#1E90FF',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#1E90FF',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#1E90FF'
                })
            })
        });
    }
})

map_layers[8] =   new ol.layer.Vector({
    name: '给水管网',
    visable:true,
    source:map_layers_source[4],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#1E90FF',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#1E90FF',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#1E90FF'
                })
            })
        });
    }
})

map_layers[9] =   new ol.layer.Vector({
    name: '通讯巡检点',
    visable:true,
    source:map_layer_point_source[5],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#EEEE00',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#EEEE00',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#EEEE00'
                })
            })
        });
    }
})

map_layers[10] =   new ol.layer.Vector({
    name: '通讯管网',
    visable:true,
    source:map_layers_source[5],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#EEEE00',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#EEEE00',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#EEEE00'
                })
            })
        });
    }
})

map_layers[11] =   new ol.layer.Vector({
    name: '雨水巡检点',
    visable:true,
    source:map_layer_point_source[6],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#7FFFD4',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#7FFFD4',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#7FFFD4'
                })
            })
        });
    }
})

map_layers[12] =   new ol.layer.Vector({
    name: '雨水管网',
    visable:true,
    source:map_layers_source[6],
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#7FFFD4',
                width: 2
            }),
            fill:new ol.style.Stroke({
                color:'#7FFFD4',
                width:2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#7FFFD4'
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

var map = new ol.Map({
    layers: map_layers,
    target: 'map',
    view: new ol.View({
        center: [12734150,3570900],
        zoom: 17
    }),
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }).extend([mousePositionControl])
});
loadLayersControl(map, "layerTree");
/***********************************************为图层控件编辑按钮添加响应事件********************************************/
var editsource=map_layers_source[1];

$('#editlayer1').on('click',function () {
    editsource=map_layers_source[1];
})
$('#editlayer2').on('click',function () {
    editsource=map_layers_source[2];
})
$('#editlayer3').on('click',function () {
    editsource=map_layers_source[3];
})
$('#editlayer4').on('click',function () {
    editsource=map_layers_source[4];
})
$('#editlayer5').on('click',function () {
    editsource=map_layers_source[5];
})
$('#editlayer6').on('click',function () {
    editsource=map_layers_source[6];
})
/*******************************点击查询**************************************/
var selectInteraction = new ol.interaction.Select();

$('#edit_btn_choose').on('click',function () {
    map.removeInteraction(selectInteraction);
    map.addInteraction(selectInteraction);
})

selectInteraction.on('select',function (e) {
    addInformation(e.selected);
})

function addInformation(data)
{
    var key = data[0].getKeys();
    document.getElementById("singleClick_location").value=key["location"];
    document.getElementById("singleClick_last_check").value=key["last_check"];
    document.getElementById("singleClick_condition").value=key["condition"];
}
/*****************拉框查询********************/

var selectedFeatures = selectInteraction.getFeatures();//已选要素存储地

var dragBox = new ol.interaction.DragBox({
    condition: ol.events.condition.platformModifierKeyOnly
});//框选图层

$('#spatial_btn_square').on('click',function () {
    map.removeInteraction(selectInteraction);
    map.addInteraction(selectInteraction);
    map.removeInteraction(dragBox);
    map.addInteraction(dragBox);
})

$('#spatial_close').click(function(){
    $('#control_panel').animate({left:'0px'},1);
    $("#spatial").css("display","none");
    map.removeInteraction(selectInteraction);
    map.removeInteraction(dragBox);
});

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
    var div = $("#spatial_table");
    div.empty();
    div.css("display","block");
    var table=$("<table class='table table-property'></table>");
    table.appendTo($("#spatial_table"));
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
var point_feature=new Array();

function addTask(data)
{
    var div = $("#task_table");
    div.empty();
    var table=$("<table class='table task-table'></table>");
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
    ToBack(id,"delete");
    data[id]=null;
    addTask(data);
}

var getclickPoint=function(e)
{
    point=e.coordinate;
    document.getElementById("task_panel").style.display='block';
}

$('#task_arrange').on('click',function () {
    map.removeInteraction(selectInteraction);
    map.addInteraction(selectInteraction);
    map.on('click',getclickPoint);
})

selectInteraction.on('select',function (e) {
    point_feature[i]=e.selected;
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
    ToBack(i,"add");
    i++;
})

$('#task_panel_close').on('click',function () {
    document.getElementById("task_panel").style.display='none';
})

function ToBack(num,backCondition)
{
    var json_str;
    json_str={};
    var featureId=(point_feature[num])[0].id_;
    var idArray=new Array();
    idArray=featureId.split(".");
    tname = data[num].getProperties();
    var key = data[num].getKeys();
    json_str.id=tname["id"];
    json_str.type=tname["type"];
    json_str.reason=tname["reason"];
    json_str.date=tname["time"];
    json_str.pipetype=idArray[0];
    json_str.pipetype_geopoint=idArray[1];
    json_str.back=null;
    json_str.back_date=null;
    switch(backCondition)
    {
        case "add":
            fetch('http://172.31.164.58:8080/mobile',{
                method:'POST',
                mode:'cors',
                headers:{'Content-TYPE':'application/json'},
                body:JSON.stringify(json_str)
            }).then( function (data) {
                alert(data.toString())
            }).catch(function (err) {
                console.log(err)
            });
            break;
        case "delete":
            fetch('http://172.31.164.58:8080/mobile',{
                method:'POST',
                mode:'cors',
                headers:{'Content-TYPE':'application/json'},
                body:JSON.stringify(json_str)
            }).then( function (data) {
                alert(data.toString())
            }).catch(function (err) {
                console.log(err)
            });
            break;
        default:
            break;
    }
}

$('#task_send').on('click',function () {
    alert("任务提交成功！");
})

/******************************属性查询************************************/
var selectsource=new ol.source.Vector();
var seleclayer=new ol.layer.Vector({
    name: '查询',
    visable:true,
    source:selectsource,
    style: function(feature, resolution) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#000000',
                width: 4
            }),
            fill:new ol.style.Stroke({
                color:'#000000',
                width:4
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#000000'
                })
            })
        });
    }
})
map.addLayer(seleclayer);

var layername=new Array();
layername[0]="gas_line";
layername[1]="waste_line";
layername[2]="electric_line";
layername[3]="water_line";
layername[4]="communication_line";
layername[5]="rain_line";

var condition=new Array();
condition[0]="loaction";
condition[1]="last_check";
condition[2]="condition";

$('#property_btn_query').on('click',function () {
    var property=document.getElementById("property_input_condition").value;
    var select_layer=document.getElementById("selectLayerName").value;
    var selectCondition=document.getElementById("selectCondition").value;
    var layerName=layername[select_layer];
    var condition_select=condition[selectCondition];
    var queryRequest = featureRequest("DigitalWebPipe", layerName,condition_select, property);
    console.log(queryRequest);
    fetch('http://119.23.244.169:8081/geoserver/wfs', {
        method: 'POST',
        body: new XMLSerializer().serializeToString(queryRequest)
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        var features = new ol.format.GeoJSON().readFeatures(json);
        addtable(features);
    });
})

function addtable(data)
{
    var div;
    var table;
    div = $("#condition_table");
    div.empty();
    table=$("<table class='table table-property'></table>");
    table.appendTo($("#condition_table"));
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

var featureRequest = function(naspace,layername,propertyname,propertytext) {
    return new ol.format.WFS().writeGetFeature({
        srsName: 'EPSG:4326',                  ///参照系
        featureNS: 'DigitalWebPipe', ///命名空间URI
        featurePrefix: naspace,             //
        featureTypes: [layername],           ///图层名
        outputFormat: 'application/json',
        filter: ol.format.filter.equalTo(propertyname,propertytext)
    });
}



