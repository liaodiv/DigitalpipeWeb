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
/**
 * Created by DELL on 2017/6/16.
 */
var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
            name:'世界地图'
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/zxt/wms',
                params: {'LAYERS': 'zxt:China','VERSION':'1.1.0','TILED':false},
                serverType: 'geoserver'
            }),
            name:'水网'
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/zxt/wms',
                params: {'LAYERS': 'zxt:China','VERSION':'1.1.0','TILED':false},
                serverType: 'geoserver'
            }),
            name:'电网'
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/zxt/wms',
                params: {'LAYERS': 'zxt:China','VERSION':'1.1.0','TILED':false},
                serverType: 'geoserver'
            }),
            name:'通讯网'
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/zxt/wms',
                params: {'LAYERS': 'zxt:China','VERSION':'1.1.0','TILED':false},
                serverType: 'geoserver'
            }),
            name:'天然气'
        })
    ],
    target: 'map',
    view: new ol.View({
        center: [12734150,3570900],
        zoom: 17
    })
});
loadLayersControl(map, "layerTree");

/*function load_layer(){
    document.getElementById("layerControl").style.display="block";
}*/
