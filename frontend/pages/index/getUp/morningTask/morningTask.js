// pages/index/studying/creatNewStudying/creatNewStudying.js
Page({
  data: {
    dayStart:'',
    timeSpan:'',
    getUpTime:'8:00',
    messages:'',
    phoneNumber:'',
    day:'',
    month:'',
    hour:'',
    min:'',
    span:'',
    flag:1,
  },
  fail: function () {
    //Todo 错误图标及提醒
    this.data.flag = 0;
    wx.showToast({
      title: '请按格式输入正确信息',
      icon: 'none',
      duration: 2000
    })
  },

  Info_In: function (e) {
    this.data.flag = 1;
    this.data.day = parseInt(this.data.dayStart.charAt(3)) * 10 + parseInt(this.data.dayStart.charAt(4));
    this.data.month = parseInt(this.data.dayStart.charAt(0)) * 10 + parseInt(this.data.dayStart.charAt(1));
    this.data.hour = parseInt(this.data.getUpTime.charAt(0));
    this.data.min = parseInt(this.data.getUpTime.charAt(2)) * 10 + parseInt(this.data.getUpTime.charAt(3));
    this.data.span=parseInt(this.data.timeSpan);
    if (isNaN(this.data.day) || isNaN(this.data.month) || isNaN(this.data.hour) || isNaN(this.data.min) || isNaN(this.data.span))
      this.fail();
    switch (this.data.month) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12: if (this.data.day > 31) this.fail(); break;
      case 4: case 6: case 9: case 11: if (this.data.day > 30) this.fail(); break;
      case 2: if (this.data.day > 29) this.fail(); break;
      default: this.fail(); break;
    }
    if (this.data.flag) {
      wx.showToast({
        title: '发布成功',
        icon: 'sucess',
        duration: 1000
      });
      setTimeout(function () {
        wx.navigateBack({
          url: '/pages/index/getUp/getUp',
        });
      }, 1000)
    }
  },
  Inform_Input: function (e) {
    var prop = e.target.dataset['prop']
    var Inform = {}
    Inform[prop] = e.detail.value
    this.setData(Inform)
  }


})