Page({
    data: {
        text: '',
        current: 0,
        max: 200,
    },
    limit: function(e) {
        var value = e.detail.value;
        var length = parseInt(value.length);
        if (length > this.data.noteMaxLen) {
            return;
        }
        this.setData({
            current: length,
            text: e.detail.value
        });
        console.log(this.data.text);
    },
    btn: function() {
        //  todo 上传text中的数据
        wx.showToast({
            title: '已上传',
            icon: 'sucess',
            duration: 1000
        });
        setTimeout(function() {
            wx.navigateBack({
                url: '/pages/index/storyMaking/storyMaking',
            });
        }, 1000)
    }

})