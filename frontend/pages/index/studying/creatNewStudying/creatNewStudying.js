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
    setTimeout(this.readyToPublish, 1000);
  },

  /**
   * 打开确认dialog
   */
  openDialog: function (e) {
    this.Modal.showModal();
    let data = {
      address: e.detail.value.address,
      date: e.detail.value.date,
      begin_time: e.detail.value.begin_time,
      initiator_name: wx.getStorageSync('loginInfo').name
    }
    // data = JSON.stringify(data);
    this.readyToPublish = this.publish.bind(this, data);
  },

  /**
   * 发布新的自习活动
   */
  publish: function (data) {
    // wx.request({
    //   method: 'POST',
    //   url: 'https://wxhomo.xyz/selfStudy',
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
    var array = wx.getStorageSync('selfStudys');
    array.push({
      guid: this.guid(),
      place: data.address,
      time: data.date + ' ' + data.begin_time,
      createBy: data.initiator_name,
      isPaticipanted: '参加',
      activeClass: ''
    })
    wx.setStorageSync('selfStudys', array);
    this.Modal.hideModal();
    wx.navigateBack();
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