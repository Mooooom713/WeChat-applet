// pages/index/studying/creatNewStudying/creatNewStudying.js
Page({
  data: {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onReady: function () {
    this.Modal = this.selectComponent(".modal");
  },

  /**
   * 取消提交
   */
  _cancelEvent: function () {
    this.Modal.hideModal();
  },

  /**
   * 确认提交
   */
  _confirmEvent: function () {
    this.Modal.hideModal();
    this.readyToPublish();
  },

  /**
   * 打开确认dialog
   */
  openDialog: function (e) {
    this.Modal.showModal();
    let data = {
      startDate: e.detail.value.startDate,
      duration: e.detail.value.duration,
      time: e.detail.value.time,
      remark: e.detail.value.remark ? e.detail.value.remark : null,
      telephone: e.detail.value.telephone ? e.detail.value.telephone : null,
      initiator: '2016220205032',
      initiator_name: 'atmoyxic'
    }
    data = JSON.stringify(data);
    this.readyToPublish = this.publish.bind(this, data);
  },

  /**
   * 发布新的早起活动
   */
  publish: function (data) {
    wx.request({
      method: 'POST',
      url: 'https://wxhomo.xyz/getup',
      data: data,
      success: function (data) {
        if (data.statusCode === 200) {
          wx.navigateBack();
        } else if (data.statusCode === 500) {
          wx.showToast({
            title: '填入的数据有误哦!',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: data.data,
            icon: 'none'
          })
        }
      }
    })
  }
})