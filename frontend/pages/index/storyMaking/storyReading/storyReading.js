
Page({
  data: {
    index: null,
    commentInfo: {},
    value: ''
  },

  onLoad: function (option) {
    let array = wx.getStorageSync('storys');
    for (let i = 0; i < array.length; i++) {
      if (array[i].guid === option.ceng) {
        this.setData({
          index: i,
          commentInfo: array[i]
        })
      }
    }
  },

  onShow: function () {
    this.timeout = null;
  },

  getValue: function (e) {
    this.content = e.detail.value;
  },

  ok: function () {
    let array = wx.getStorageSync('storys');
    array[this.data.index].comments.push({
      comment_content: this.content,
      commentor: wx.getStorageSync('loginInfo').name
    })
    wx.setStorageSync('storys', array);
    this.setData({
      commentInfo: array[this.data.index],
      value: ''
    })
  },

  submit: function () {
    if (!this.content) {
      wx.showToast({
        title: '请填写完整！',
        icon: "none"
      })
      return;
    }
    this.delay();
  },

  delay: function () {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.ok.bind(this), 1000);
  }
})