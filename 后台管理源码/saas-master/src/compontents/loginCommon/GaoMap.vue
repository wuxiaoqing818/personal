<template>
  <div>
    <div id="map_container" style="width:500px;height:300px;"></div>
  </div>
</template>

<script>
import axios from 'axios'
import AMap from 'AMap'
var map,marker;
export default {
   data () {
    return {
      mapInfo:{
        lng:'',
        lat:'',
        detail:''
      }
    }
  },
  mounted(){
    this.amapView()
  },
  methods:{
    amapView(){
      map = new AMap.Map('map_container', {
        zoom:11,
        resizeEnable: true,
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })     
      this.showInfoClick()
    },
    // 点击地图获取当前经纬度
    showInfoClick(){
      let that = this
      AMap.event.addListener(map,'click',function (e) {
        // 将经纬度赋值给mapInfo
        that.mapInfo.lng = e.lnglat.getLng()
        that.mapInfo.lat = e.lnglat.getLat()
        that.getAddress(e.lnglat.getLng(),e.lnglat.getLat())
      })
    },
    // 根据经纬度获取当前地址信息
    getAddress(lng,lat){
      let that = this
      axios.get('//restapi.amap.com/v3/geocode/regeo?key=f211857599047852b425815b7d4a29e7&location='+lng+','+lat+'&radius=1000&extensions=all&batch=false&roadlevel=0')
      .then(function (res) {
        if(res.status == 200){
          if(res.data.regeocode.formatted_address){
            that.mapInfo.detail = res.data.regeocode.formatted_address
            // 向父组件传值
            that.$emit('getMapValue', that.mapInfo)
            //
            that.addMarker(lng,lat,res.data.regeocode.formatted_address)
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    // 根据区名来在地图上定位当前城市
    gotoCity(cityValue){
      map.setCity(cityValue);
    },
    // 点击后在该地点添加点标记及其label标签
    addMarker(lng,lat,detail){
        //如果存在上一个marker，则先删除，之后再添加新的marker
        if(marker){
          map.remove(marker);
        }
        marker = new AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: [lng,lat],
            offset: new AMap.Pixel(-13,-30)
        });
        marker.setMap(map);
        marker.setLabel({
            //修改label相对于maker的位置
            offset: new AMap.Pixel(-50, 40),
            content: "<div class='info'>"+detail+"</div>"
        });
    }
  }
}
</script>

<style lang='scss'>
    .amap-icon img,
    .amap-marker-content img{
        width: 25px;
        height: 34px;
    }
    .amap-marker-label {
        width: 200px;
        border: 1px solid #ccc;
        padding: 10px 18px 10px 10px;
        line-height: 1.4;
        overflow: auto;
        box-shadow: 0 3px 14px rgba(0,0,100,.6);
        background: #fff;
        border-radius: 2px;
        padding: 10px;
        text-align: left;
        word-break: normal;
        white-space: normal	;
    }

</style>


