// pages/index/studying.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 2,
    array: []
  },

  test: function () {
    this.data.id = this.data.id * 10 + 1,
      console.log(this.data.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 展示所有自习活动数据
   */
  showAllDatas: function (res) {
    let array = [];
    for (let i = 0; i < res.data.length; i++) {
      array.push({
        place: res.data[i].address,
        time: res.data[i].begin_time + '-' + res.data[i].end_time,
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
    //   url: 'https://wxhomo.xyz/selfStudy',
    //   success: this.showAllDatas.bind(this)
    // })
    if (!wx.getStorageSync('selfStudys') || wx.getStorageSync('selfStudys').length === 0) {
      wx.setStorageSync('selfStudys', [{
        place: '立人楼',
        time: '2019-01-01 8:00:00',
        createBy: 'joie'
      }, {
        place: '品学楼',
        time: '2019-01-01 6:00:00',
        createBy: 'amy'
      }])
    }
    this.setData({
      array: wx.getStorageSync('selfStudys')
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