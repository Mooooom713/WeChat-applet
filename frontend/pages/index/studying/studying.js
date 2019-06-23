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
    wx.request({
      url: 'https://wxhomo.xyz/selfStudy',
      success: this.showAllDatas.bind(this)
    })
  },

  /**
   * 展示所有自习活动数据
   */
  showAllDatas: function (res) {
    console.log(res)
    const array = this.data.array;
    for (let i = 0; i < res.data.length; i++) {
      array.push({
        placeholder: '地点',
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

  _submitJoinEvent() {
    console.log('welcome')
  }
})