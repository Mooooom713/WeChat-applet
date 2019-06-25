// pages/index/getUp/getUp.js
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
   * 展示所有早起活动数据
   */
  showAllDatas: function (res) {
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
    if (!wx.getStorageSync('getUps') || wx.getStorageSync('getUps').length === 0) {
      wx.setStorageSync('getUps', [{
        guid: this.guid(),
        place: '14天',
        time: '2019-01-01 8:00:00',
        createBy: 'joie',
        isPaticipanted: '参加',
        activeClass: ''
      }, {
        guid: this.guid(),
        place: '20天',
        time: '2019-01-01 6:00:00',
        createBy: 'amy',
        isPaticipanted: '参加',
        activeClass: ''
      }])
    }
    this.setData({
      array: wx.getStorageSync('getUps')
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

  },

  _submitJoinEvent: function (e) {
    let array = this.data.array;
    let index = null;
    for (let i = 0; i < array.length; i++) {
      if (array[i].guid === e.currentTarget.dataset.guid) {
        index = i;
        break;
      }
    }
    if (index !== null) {
      if(array[index].isPaticipanted === '参加') {
        array[index].isPaticipanted = '取消参加';
        array[index].activeClass = 'active';
      } else {
        array[index].isPaticipanted = '参加';
        array[index].activeClass = '';
      }
    }
    wx.setStorageSync('getUps', array)
    this.setData({
      array: array
    })
  },

  guid: function () {
    var sGuid = '';
    for (var i = 0; i < 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      sGuid += n;
      if (i === 7 || i === 11 || i === 15 || i === 19) {
        sGuid += '-';
      }
    }
    return sGuid;
  }
})