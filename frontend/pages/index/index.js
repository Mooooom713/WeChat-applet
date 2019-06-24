// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  navigate: function (e) {
    if (!wx.getStorageSync('loginInfo')) {
      wx.showToast({
        title: '请先登录才能访问这些功能哦！',
        icon: "none"
      })
      return;
    }
    switch (e.currentTarget.dataset.module) {
      case '1':
        wx.navigateTo({
          url: '/pages/index/studying/studying?type=1'
        })
        break;
      case '2':
        wx.navigateTo({
          url: '/pages/index/getUp/getUp?type=2'
        })
        break;
      case '3':
        wx.navigateTo({
          url: '/pages/index/photograph/photograph?type=3'
        })
        break;
      case '4':
        wx.navigateTo({
          url: '/pages/index/storyMaking/storyMaking?type=4&ceng=1'
        })
        break;
      default:
        break;
    }
  }
})