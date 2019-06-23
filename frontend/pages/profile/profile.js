// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        isLogin: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        try {
            var value = wx.getStorageSync('loginInfo')
            if (value) {
              this.setData({
                  userInfo: value,
                  isLogin: true
              })
            }
          } catch (e) {
            console.log(e)
          }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.loginDialog = this.selectComponent("#loginDialog");
        this.registerDialog = this.selectComponent("#registerDialog");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log(this.data.userInfo)
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

    _showLoginDialog() {
        this.loginDialog.showDialog();
    },

    _showRegisterDialog() {
        this.registerDialog.showDialog();
    },

    _confirmLoginEvent() {
        const { uID, sPW } = this.loginDialog.getLoginData()
        wx.request({
            url: 'https://wxhomo.xyz/login',
            method: 'POST',
            data: {
                user_id: uID,
                user_password: sPW
            },
            success: this.handleSuccess.bind(this),
            fail: this.handleError.bind(this)
        })
    },

    handleSuccess(data) {
        const userInfo = data.data;
        try {
            wx.setStorageSync('loginInfo', userInfo);
            this.setData({
                userInfo: userInfo,
                isLogin: true
            })
          } catch (e) { 
            wx.showToast({
                title: "登录失败",
                icon: "none"
            })
        }
        console.log(userInfo)
        this.loginDialog.hideDialog()
    },

    handleError(error) {
        console.log(error)
    }
})