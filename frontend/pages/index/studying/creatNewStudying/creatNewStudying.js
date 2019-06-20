 // pages/index/studying/creatNewStudying/creatNewStudying.js
Page({
  data: {
    month: '',
    day: '',
    hourSt: '',
    hourEnd: '',
    minSt: '',
    minEnd: '',
    studyPlace: '',
    messages: '',
    phoneNumber: '',
    dayIn: '',
    beginIn: '',
    endIn: '',
    flag:1
  },
  fail: function () {
    //Todo 错误图标及提醒
    this.data.flag=0;
    wx.showToast({
      title: '请按格式输入正确信息',
      icon: 'none',
      duration: 2000
    })
  },

  Info_In: function (e) {
    this.data.flag=1;
    this.data.minSt = parseInt(this.data.beginIn.charAt(3)) * 10 + parseInt(this.data.beginIn.charAt(4));
    this.data.minEnd = parseInt(this.data.endIn.charAt(3)) * 10 + parseInt(this.data.endIn.charAt(4));
    this.data.hourSt = parseInt(this.data.beginIn.charAt(0)) * 10 + parseInt(this.data.beginIn.charAt(1));
    this.data.hourEnd = parseInt(this.data.endIn.charAt(0)) * 10 + parseInt(this.data.endIn.charAt(1));
    this.data.day = parseInt(this.data.dayIn.charAt(3)) * 10 + parseInt(this.data.dayIn.charAt(4));
    this.data.month = parseInt(this.data.dayIn.charAt(0)) * 10 + parseInt(this.data.dayIn.charAt(1));
    if (isNaN(this.data.month) || isNaN(this.data.day) || isNaN(this.data.minEnd) || isNaN(this.data.minSt) || isNaN(this.data.hourSt) || isNaN(this.data.hourEnd) || this.data.minEnd > 60 || this.data.minSt > 60 || this.data.hourSt > 12 || this.data.hourEnd > 12 || (this.data.hourEnd * 60 + this.data.minEnd) <= (this.data.hourSt * 60 + this.data.minSt))
      this.fail();
    switch (this.data.month) {
      case 1: case 3:case 5:case 7:case 8:case 10: case 12: if (this.data.day > 31) this.fail(); break;
      case 4: case 6: case 9: case 11: if (this.data.day > 30) this.fail(); break;
      case 2: if (this.data.day > 29) this.fail(); break;
      default: this.fail(); break;
    }
    if (this.data.flag){
      wx.showToast({
        title: '发布成功',
        icon: 'sucess',
        duration: 1000
      });
      setTimeout(function () {
        wx.navigateBack({
          url: '/pages/index/studying/studying',
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