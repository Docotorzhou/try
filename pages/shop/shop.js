// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   product:{},
   category:[],
   bagNum:1
  },
  //改变购物袋

  
  //封装数据
  x(){
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:3000/carts',
      header: {
        'Authorization': `${token}`
      },
      success: res => {
        console.log(res)
        this.setData({
          product: res.data,
          category: res.data.data,
        })
      }
    })
  },
    //页面没商品时
  scan() {
    var that=this
    var token = wx.getStorageSync('token')
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.request({
          url: 'http://localhost:3000/carts',
          method: 'POST',
          data: {
            code: res.result
          },
          header: {
            'Authorization': `${token}`
          },
          success: res => {
            console.log(res)
           this.x()
          }
        })
      }
    })
  },
  

  //生成订单
  toOrders(){
    wx.request({
      url: 'http://localhost:3000/orders',
      method:"POST",
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success:res=>{
        console.log(res)
        let id=res.data.orderId
        if(this.data.product.number>0)
        {
          wx.navigateTo({
            url: `../orders/orders?id=${id}`
          })
          }
          else{
            return false;
          }
      }
    })
  },




   //修改购物袋数量
  changeBag(e){
    console.log(e)

  },
   
  //改变商品数量
  changNum(e){
    console.log(e)
    let cart_id = e.currentTarget.dataset.cart_id
    let type = e.currentTarget.dataset.type
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:3000/carts',
      method:"PUT",
      header: {
        'Authorization': `${token}`
      },
      data: {
        type:type,
        cart_id:cart_id
      },
      success:res=>{
        this.x()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.x()
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