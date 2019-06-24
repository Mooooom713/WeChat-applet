// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        isLogin: false,
        type: ''
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
        this.setData({
            type: 'login'
        })
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

    _confirmRegisterEvent() {
        const { uID, sPW, sName, sSex, sAge, sGrade, sCollege, sMajor } = this.registerDialog.getRegisterData()
        this.setData({
            type: 'register'
        })
        wx.request({
            url: 'https://wxhomo.xyz/newUser',
            method: 'POST',
            data: {
                user_id: uID,
                user_password: sPW,
                gender: sSex,
                age: sAge,
                grade: sGrade,
                department: sCollege,
                major: sMajor,
                name: sName
            },
            success: this.handleSuccess.bind(this),
            fail: this.handleError.bind(this)
        })
    },

    handleSuccess(data) {
        const userInfo = data.data;
        const { type } = this.data
        try {
            wx.setStorageSync('loginInfo', userInfo);
            this.setData({
                userInfo: userInfo,
                isLogin: true
            })
          } catch (e) { 
            const title = type === 'login' ? '登录失败' : '注册失败';
            wx.showToast({
                title: title,
                icon: "none"
            })
        }
        if(type === 'login'){
            this.loginDialog.hideDialog()
        }else{
            this.registerDialog.hideDialog()
        }
    },

    handleError(error) {
        const { type } = this.data
        if(type === 'login'){
            wx.showToast({
                title: '登录失败，请确认用户名和密码是否正确',
                icon: "none"
            })
        }else{
            wx.showToast({
                title: '注册失败，请重新注册',
                icon: "none"
            })
        }
    }
})