var amapFile = require('../../libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
var citys = require('../../libs/city')
Page({
  data:{
    city:"北京市",
    tips:{},
    weather:{},
    isshowcityselect:false,
    hotcity:{},
    alpcity:{}
    // alp:['','','','','','','','']
  },
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'ecf8424f6d46412c240c9400686d9497'});
    myAmapFun.getWeather({
      success: function(data){
        //成功回调
        that.setData({
          weather:data
        })
        // console.log(that.data.weather)
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    }),
    this.setData({
      hotcity:citys.hot,
      alpcity:citys.all
    })
    // console.log(this.data.alpcity)
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
      isshowcityselect:!this.data.isshowcityselect
    })
  },
  handlecity(e){
    const ccity = e.currentTarget.dataset.name;
    this.setData({
      city:ccity,
      isshowcityselect:!this.data.isshowcityselect
    })
  }
})