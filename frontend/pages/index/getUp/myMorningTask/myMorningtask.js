// pages/index/getUp/myMorningTask/myMorningtask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 展示用户早起活动数据
   */
  showAllDatas: function (res) {
    // 获取当前登录用户ID
    let array = [];
    for (let i = 0; i < res.data.length; i++) {
      array.push({
        place: res.data[i].duration + '天',
        time: res.data[i].time,
        createBy: res.data[i].initiator_name
      })
    }
    this.setData({
      array: array
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.request({
    //   url: 'https://wxhomo.xyz/getUp',
    //   success: this.showAllDatas.bind(this)
    // })
    this.setData({
      array: wx.getStorageSync('getUps').filter((item) => {
        return item.createBy === wx.getStorageSync('loginInfo').name;
      })
    })
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