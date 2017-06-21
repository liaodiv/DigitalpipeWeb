/**
 * Created by 27353 on 2017/6/14.
 */
//TODO 图层控制组件
///获取layers ,返回地图控制的
if(!window.map){
    console.log("map不存在")
}
var Conmap = window.map;

var layers=Conmap.getLayers();

console.log(layers);

function loadLayersCOntrol(map,id) {
    var treeContent = document.getElementById(id); //图层目录容器
    var layers = map.getLayers(); //获取地图中所有图层
    for (var i = 0; i < layers.getLength(); i++) {
        //获取每个图层的名称、是否可见属性
        layers[i] = layers.item(i);
        var layerName = layers[i].get('title');
        var layerVisibility = layers[i].getVisible();
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
        elementLable.innerText = layerName;
        elementLi.appendChild(elementLable);
        //设置图层默认显示状态
        if (layerVisibility) {
            elementInput.checked = true;
        }
        addChangeEvent(elementInput, layers[i]);  //为checkbox添加变更事件
    }

    
}


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

module.exports = loadLayersCOntrol;  //导出函数
