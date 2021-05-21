var amapFile = require('../../libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
var citys = require('../../libs/city')
var markersData = [];
Page({
  data:{
    city:"北京市",
    tips:{},
    isshowcityselect:true,
    hotcity:{},
    alpcity:{},
    longitude:'',
    latitude:'',
    markers:[],
    alp:['★','A','B','C','D',"E","F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
    showalp:'',
    isshowalp:true,
    scrollalp:'',
    isshowmap:false
  },
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'ecf8424f6d46412c240c9400686d9497'});
   
    this.setData({
      hotcity:citys.hot,
      alpcity:citys.all
    })
    // console.log(this.data.alpcity)

    myAmapFun.getRegeo({
      success: function(data){
        console.log(data)
        that.setData({
          latitude:data[0].latitude,
          longitude:data[0].longitude,        
        })
        //成功回调
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })

    // wx.getLocation({
    //   type: "wgs84",
    //   success: function(res){
    //     var latitude = res.latitude;
    //     var longitude = res.longitude;
    //    console.log(res.latitude);
    //     that.setData({
    //      latitude: res.latitude,
    //      longitude: res.longitude,
        
    //     })
    //   }
    // })
  },
  bindInput(e){
    // console.log(e)
    var that = this
    var keywords = e.detail.value
    var myAmapFun = new amapFile.AMapWX({key: 'ecf8424f6d46412c240c9400686d9497'});
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      success: function(data){
        
        if(data && data.tips){
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  cityselect(){
    this.setData({
      isshowcityselect:!this.data.isshowcityselect,
      
    })
  },
  handlecity(e){
    const ccity = e.currentTarget.dataset.name;
    this.setData({
      city:ccity,
      isshowcityselect:!this.data.isshowcityselect
    })
  },
  makertap: function(e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData,id);
    that.changeMarkerColor(markersData,id);
  },
  touchstart(e){
    // console.log(e)
    const alpitem = e.currentTarget.dataset.name
    this.setData({
      showalp:alpitem,
      isshowalp:false,
      
    })
  },
  touchend(e){
    // console.log(e)
    this.setData({
      isshowalp:true,
      scrollalp:e.currentTarget.id,
      
    })
    // console.log(this.data.scrollalp)
  },
  touchmove(e){
    console.log(e)
    var y = e.touches[0].clientY;
    var offtop = e.currentTarget.offsetTop;
    if(y>offtop){
      var num = parseInt(((y-offtop)/16))
      console.log(num)
      this.setData({
        showalp:this.data.alp[num]
      })
    }
  }
})