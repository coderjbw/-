// components/w-input/w-input.js
var amapFile = require('../../libs/amap-wx.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      tips:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    bindSearch(e){
      console.log(e)
      var keywords = e.target.dataset.keywords;
      var url = '../poi/poi?keywords=' + keywords;
      console.log(url)
      wx.redirectTo({
        url: url
      })
    }
  }
})
