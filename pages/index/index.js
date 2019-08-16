//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    code:''
  },

   //跳转购物车
  toShop:function(){
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  //调取扫码
  scan(){
   var token = wx.getStorageSync('token')
    wx.navigateTo({
      url: '../shop/shop',
    })
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.request({
          url: 'http://localhost:3000/carts',
          method:'POST',
          data: {
            code: res.result
          },
          header: {
            'Authorization': `${token}`
          },
          success:res=>{
            console.log(res)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://itfun.tv/api/v1/home.json',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      data: {},
      success: function (res) {
        console.log(res)
        that.setData({
          imgUrls: res.data.slide_courses,
        })
      }


    })
    
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})


