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

    submit: function (e) {
        if (!e.detail.value.title || !e.detail.value.content) {
            wx.showToast({
                title: '请填写完整！',
                icon: "none"
            })
            return;
        }
        let array = wx.getStorageSync('storys');
        array.push({
            guid: this.guid(),
            storyName: e.detail.value.title,
            storyNumbers: wx.getStorageSync('loginInfo').name,
            content: e.detail.value.content,
            comments: []
        })
        this.Modal.showModal();
        this.ook = this.ok.bind(this, array);
    },

    ok: function (array) {
        wx.setStorageSync('storys', array);
        this.Modal.hideModal();
        wx.navigateBack();
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
        this.timeout = setTimeout(this.ook, 1000);
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