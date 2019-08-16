// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[],
    total:{}

  },
  //支付
  toPay(){
    let out_trade_no = this.data.total.order.out_trade_no
    wx.request({
      url: 'http://localhost:3000/orders/pay',
      method:"POST",
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      data:{
        out_trade_no: out_trade_no
      },
      success:res=>{
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) { },
          fail(res) { }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id=options.id
    wx.request({
      url: `http://localhost:3000/orders?id=${id}`,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success:res=>{
        console.log(res)
        this.setData({
          category: res.data.order.Order_products,
          total:res.data
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