/**
 * Created by DELL on 2017/6/21.
 */
//z在这里写吧
/////////////////////////////////////点击获取数据////////////////////////////////
/*var Smap=window.map;
var interaction;
Smap.removeInteraction(interaction);
interaction = new ol.interaction.Select();
Smap.addInteraction(interaction);
interaction.on('select',function (e) {
    console.log(e.selected[0].getKeys());
    console.log(e.selected)
    addtable(e.selected);
    // console.log(e.target.getFeature());
})
/**
 * select and edit
 * */
/*var featureRequest = new ol.format.WFS().writeGetFeature({
    srsName: 'EPSG:4326',                  ///参照系
    featureNS: 'GIS_DATA', ///命名空间URI
    featurePrefix: 'postdata',             //
    featureTypes: ['污水线'],           ///图层名
    outputFormat: 'application/json',
    filter:
        ol.format.filter.equalTo('continent', '亚洲')
});
*/
function select() {
    console.log("it start");
    //fetch('https://ahocevar.com/geoserver/wfs', {
    fetch('http://localhost:8080/geoserver/wfs', {
        method: 'POST',
        body: new XMLSerializer().serializeToString(featureRequest)
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        var features = new ol.format.GeoJSON().readFeatures(json);
        console.log(features);
        addtbale(features);
        /*  vectorSource.addFeatures(features);
         map.getView().fit(vectorSource.getExtent());*/
   });
    console.log("it start");
    return false;
}
function addtable(data)
{
    console.log("创表ing");
}
module.exports=select;