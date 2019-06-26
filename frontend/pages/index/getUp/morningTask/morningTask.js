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

  onShow: function () {
    this.timeout = null;
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
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.readyToPublish, 1000);
  },

  /**
   * 打开确认dialog
   */
  openDialog: function (e) {
    if (!e.detail.value.startDate || !e.detail.value.duration || !e.detail.value.time) {
      wx.showToast({
        title: '开始日期 任务长度 起床时间是必填项哦！',
        icon: "none"
      })
      return;
    }
    this.Modal.showModal();
    let data = {
      startDate: e.detail.value.startDate,
      duration: e.detail.value.duration,
      time: e.detail.value.time,
      initiator_name: wx.getStorageSync('loginInfo').name
    }
    // data = JSON.stringify(data);
    this.readyToPublish = this.publish.bind(this, data);
  },

  /**
   * 发布新的早起活动
   */
  publish: function (data) {
    // wx.request({
    //   method: 'POST',
    //   url: 'https://wxhomo.xyz/getup',
    //   data: data,
    //   success: function (data) {
    //     if (data.statusCode === 200) {
    //       wx.navigateBack();
    //     } else if (data.statusCode === 500) {
    //       wx.showToast({
    //         title: '填入的数据有误哦!',
    //         icon: 'none'
    //       })
    //     } else {
    //       wx.showToast({
    //         title: data.data,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
    var array = wx.getStorageSync('getUps');
    array.push({
      guid: this.guid(),
      place: data.duration + '天',
      time: data.startDate + ' ' + data.time,
      createBy: data.initiator_name,
      isPaticipanted: '参加',
      activeClass: '',
      paticipanters: []
    })
    wx.setStorageSync('getUps', array);
    this.Modal.hideModal();
    wx.navigateBack();
    wx.showToast({
      title: '创建成功！',
      icon: "success"
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