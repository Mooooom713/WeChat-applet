// pages/storyMaking.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ceng: 1,
        type: 4,
        array: []
    },
    intoAStudying: function () {
        console.log("into");
        console.log(this.data);

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            ceng: parseInt(options.ceng) + 1,
            type: options.type,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (!wx.getStorageSync('storys') || wx.getStorageSync('storys').length === 0) {
            wx.setStorageSync('storys', [{
                guid: this.guid(),
                storyName: '农夫与蛇',
                storyNumbers: 'amy',
                content: '这是一个很长很长的故事这是一个很长很长的故事这是一个很长很长的故事这是一个很长很长的故事',
                comments: [{
                    comment_content: '好有趣啊',
                    commentor: 'joie'
                }]
            }])
        }
        this.setData({
            array: wx.getStorageSync('storys')
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

    },

    /**
     * nav to detail
     */
    _navToDetail() {
        
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