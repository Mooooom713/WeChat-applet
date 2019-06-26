// pages/photograph.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photographInfos : [],
    reportedIndex: 0
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
    this.Modal = this.selectComponent(".modal");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      var value = wx.getStorageSync('photographInfos')
      if (value && value.length > 0) {
        this.setData({
          photographInfos: value
        })
      } else {
        let arr = [];
        const data = {
          imgUrls : ['/pages/picture/testFunction1.jpg', '/pages/picture/testFunction2.jpg'],
          user : 'Amy Li',
          content: 'Reality',
          thumbsNumber : 12,
          beReported : false,
          hasLiked : false
        };
        arr.push(data);
        wx.setStorage({
          key:"photographInfos",
          data: arr
        })
    
        this.setData({
          photographInfos: arr
        })
      }
    } catch (e) {
      wx.showToast({
        title: '网络异常',
        icon: "none"
      })
    }
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

  handleThumbsUp (e) {
    const index = e.detail;
    const oData = this.data.photographInfos;
    if(oData[index].hasLiked){
      oData[index].thumbsNumber--
      oData[index].hasLiked = false
    }else{
      oData[index].thumbsNumber++
      oData[index].hasLiked = true
    }
    wx.setStorage({
      key:"photographInfos",
      data: oData
    })

    this.setData({
      photographInfos: oData
    })
  },

  handleReport(e) {
    const index = e.detail;
    this.setData({
      reportedIndex: index
    })
    this.Modal.showModal();
    
  },

  cancelEvent () {
    this.Modal.hideModal();
  },

  confirmEvent () {
    const oData = this.data.photographInfos;
    const index = this.data.reportedIndex;
    oData[index].beReported = true
    wx.setStorage({
      key:"photographInfos",
      data: oData
    })
    this.setData({
      photographInfos: oData
    })
    this.Modal.hideModal();
  }
})