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
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.loginDialog = this.selectComponent("#loginDialog");
        this.registerDialog = this.selectComponent("#registerDialog");
        this.Modal = this.selectComponent(".modal");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
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
        if (!wx.getStorageSync('registerInfos') || wx.getStorageSync('registerInfos').length === 0) {
            wx.setStorageSync('registerInfos', [{
                user_id: "0000000000000",
                user_password: "password",
                gender: "男",
                age: "42",
                grade: "无",
                department: "信软",
                major: "无",
                name: "管理员",
                role: "admin"
            }])
        }
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

    _showLoginDialog() {
        this.loginDialog.showDialog();
    },

    _showRegisterDialog() {
        this.registerDialog.showDialog();
    },

    _confirmLoginEvent() {
        const { uID, sPW } = this.loginDialog.getLoginData()
        // this.setData({
        //     type: 'login'
        // })
        // wx.request({
        //     url: 'https://wxhomo.xyz/login',
        //     method: 'POST',
        //     data: {
        //         user_id: uID,
        //         user_password: sPW
        //     },
        //     success: this.handleSuccess.bind(this),
        //     fail: this.handleError.bind(this)
        // })
        const userInfo = {
            user_id: uID,
            user_password: sPW
        }
        if(this.loginTimer){
            clearTimeout(this.loginTimer)
        }
        this.loginTimer = setTimeout(() => {
            this.fakeLoginRequest(userInfo)
        }, 1000);
    },

    fakeLoginRequest(userInfo) {
        let registerInfos = wx.getStorageSync('registerInfos') ? wx.getStorageSync('registerInfos') : [];
        for (let i = 0; i < registerInfos.length; i++) {
            if (registerInfos[i].user_id === userInfo.user_id) {
                if (registerInfos[i].user_password === userInfo.user_password) {
                    wx.setStorageSync('loginInfo', registerInfos[i]);
                    this.loginDialog.hideDialog();
                    wx.showToast({
                        title: '登录成功!',
                        icon: "success"
                    })
                    this.loginDialog.handleClearData()
                    this.setData({
                        userInfo: registerInfos[i],
                        isLogin: true
                    })
                } else {
                    wx.showToast({
                        title: '密码错误',
                        icon: "none"
                    })
                }
                return;
            }
        }
        wx.showToast({
            title: '该账号不存在',
            icon: "none"
        })
    },

    _confirmRegisterEvent() {
        const { uID, sPW, sName, sSex, sAge, sGrade, sCollege, sMajor } = this.registerDialog.getRegisterData();
        // this.setData({
        //     type: 'register'
        // })
        // wx.request({
        //     url: 'https://wxhomo.xyz/newUser',
        //     method: 'POST',
        //     data: {
        //         user_id: uID,
        //         user_password: sPW,
        //         gender: sSex,
        //         age: sAge,
        //         grade: sGrade,
        //         department: sCollege,
        //         major: sMajor,
        //         name: sName
        //     },
        //     success: this.handleSuccess.bind(this),
        //     fail: this.handleError.bind(this)
        // })
        if(uID && sPW && sName && sSex && sAge && sGrade && sCollege && sMajor){
            const userInfo = {
                user_id: uID,
                user_password: sPW,
                gender: sSex,
                age: sAge,
                grade: sGrade,
                department: sCollege,
                major: sMajor,
                name: sName,
                role: "student"
            }
            if(this.registerTimer){
                clearTimeout(this.registerTimer)
            }
            this.registerTimer = setTimeout(() => {
                this.fakeRegisterRequest(userInfo)
            }, 1000);
        }else{
            wx.showToast({
                title: '所有信息均为必填',
                icon: "none"
            })
        }
    },

    fakeRegisterRequest(userInfo) {
        let registerInfos = wx.getStorageSync('registerInfos') ? wx.getStorageSync('registerInfos') : [];
        let hasDuplicateID = false;
        for (let i = 0; i < registerInfos.length; i++) {
            if (registerInfos[i].user_id === userInfo.user_id) {
                hasDuplicateID = true;
                break;
            }
        }
        if (hasDuplicateID) {
            wx.showToast({
                title: '该ID已经存在',
                icon: "none"
            })
        } else {
            registerInfos.push(userInfo);
            wx.setStorageSync('registerInfos', registerInfos);
            wx.setStorageSync('loginInfo', userInfo);
            wx.showToast({
                title: '注册成功!',
                icon: "success"
            })
            this.registerDialog.hideDialog();
            this.registerDialog.handleClearData()
            this.setData({
                userInfo: userInfo,
                isLogin: true
            })
        }
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
        if (type === 'login') {
            this.loginDialog.hideDialog()
        } else {
            this.registerDialog.hideDialog()
        }
    },

    handleError(error) {
        const { type } = this.data
        if (type === 'login') {
            wx.showToast({
                title: '登录失败，请确认用户名和密码是否正确',
                icon: "none"
            })
        } else {
            wx.showToast({
                title: '注册失败，请重新注册',
                icon: "none"
            })
        }
    },

    exit() {
        this.Modal.showModal();
    },

    _cancelEvent: function () {
        this.Modal.hideModal();
    },

    _confirmEvent: function () {
        this.setData({
            userInfo: null,
            isLogin: false
        })
        this.Modal.hideModal();
        wx.setStorageSync('loginInfo', null);
    },
})