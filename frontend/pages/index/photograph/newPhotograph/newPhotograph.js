// pages/photograph.js
var that;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: [],
        uploadedImages: [],
        desc: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        that = this;
        var objectId = options.objectId;
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    chooseImage: function() {
        // 选择图片
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                if (that.data.images.length + tempFilePaths.length <= 9) {
                    that.setData({
                        images: that.data.images.concat(tempFilePaths)
                    });
                } else {
                    wx.showToast({
                        title: "最多只能上传9张照片",
                        icon: "none"
                    })
                }
            }
        })
    },
    // 图片预览
    previewImage: function(e) {
        //console.log(this.data.images);
        var current = e.target.dataset.src
        wx.previewImage({
            current: current,
            urls: this.data.images
        })
    },
    delete: function(e) {
        var index = e.currentTarget.dataset.index;
        var images = that.data.images;
        images.splice(index, 1);
        that.setData({
            images: images
        });
    },

    handleDesc (e) {
        const value = e.detail.value
        this.setData({
            desc: value
        })
    },

    submit () {
        const { desc, images } = this.data
        const oData = {
            imgUrls: images,
            content: desc,
            thumbsNumber: 0,
            beReported : false,
            hasLiked : false
        }
        try {
            var value = wx.getStorageSync('photographInfos')
            var loginInfo = wx.getStorageSync('loginInfo')
            if(value && loginInfo){
                oData.user = loginInfo.name
                const newData = value.concat(oData)
                wx.setStorage({
                    key: "photographInfos",
                    data: newData
                })
            } else if(loginInfo){
                let arr = []
                oData.user = loginInfo.name
                arr.push(oData)
                wx.setStorage({
                    key: "photographInfos",
                    data: arr
                })
            } else {
                wx.showToast({
                    title: '请检查登录状态是否异常',
                    icon: "none"
                })
            }
            wx.navigateBack();
        } catch (e) {
            wx.showToast({
                title: '发布失败',
                icon: "none"
            })
        }
    }
})