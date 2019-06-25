
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

  getValue: function (e) {
    this.submit = this.ok.bind(this, e.detail.value);
  },

  ok: function (data) {
    let array = wx.getStorageSync('storys');
    array[this.data.index].comments.push({
      comment_content: data,
      commentor: wx.getStorageSync('loginInfo').name
    })
    wx.setStorageSync('storys', array);
    this.setData({
      commentInfo: array[this.data.index],
      value: ''
    })
  }
})