// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    photographErrorInfos: [],
    type: '00',
    text: '',
    contentIndex : 0
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
    if (!wx.getStorageSync('loginInfo') || wx.getStorageSync('loginInfo').role === 'student') {
      this.setData({
        isShow: false
      })
    } else {
      try {
        var value = wx.getStorageSync('photographInfos')
        if (value) {
          this.setData({
            isShow: true,
            photographErrorInfos: value
          })
        }
      } catch (e) {
        wx.showToast({
          title: '数据获取失败',
          icon: "none"
        })
      }
    }
    this.Modal = this.selectComponent(".modal");
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
        title: '请先进入我的进行登录才能访问这些功能哦！',
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
  },

  handlePass (e) {
    const index = e.detail;
    this.setData({
      contentIndex: index,
      text: '审核通过'
    })
    this.Modal.showModal();
  },

  handleNotPass (e) {
    const index = e.detail;
    console.log(index)
    this.setData({
      contentIndex: index,
      text: '审核不通过',
      type: '01'
    })
    this.Modal.showModal();
  },

  _cancelEvent(){
    this.Modal.hideModal();
  },

  _confirmEvent(){
    const { contentIndex, photographErrorInfos, type } = this.data
    const newData = photographErrorInfos.slice(0)
    if(type === '01'){
      newData.splice(contentIndex, 1)
    }else{
      newData[contentIndex].beReported = false
    }
    this.setData({
      photographErrorInfos: newData
    })
    wx.setStorage({
      key: "photographInfos",
      data: newData
    })
    this.Modal.hideModal();
    wx.showToast({
      title: '审批完成',
      icon: "none"
    })
  }
})