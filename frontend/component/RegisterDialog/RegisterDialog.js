// components/Dialog/dialog.js
Component({
  options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
      // 弹窗显示控制
      isShow: false,
      uID: '',
      sPW: '',
      sName: '',
      sSex: '',
      sAge: '',
      sGrade: '',
      sCollege: '',
      sMajor: ''
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
      /*
       * 公有方法
       */

      //隐藏弹框
      hideDialog() {
          this.setData({
              isShow: !this.data.isShow
          })
      },
      //展示弹框
      showDialog() {
          this.setData({
              isShow: !this.data.isShow
          })
      },
      getRegisterData() {
          return this.data;
      },
      /*
       * 内部私有方法建议以下划线开头
       * triggerEvent 用于触发事件
       */
      _handleSaveID(e) {
          this.setData({
            uID : e.detail.value
          })
      },
      _handleSavePW(e) {
          this.setData({
            sPW : e.detail.value
          })
      },
      _handleSaveNM(e) {
          this.setData({
            sName : e.detail.value
          })
      },
      _handleSaveSX(e) {
          this.setData({
            sSex : e.detail.value
          })
      },
      _handleSaveAG(e) {
          this.setData({
            sAge : e.detail.value
          })
      },
      _handleSaveGD(e) {
          this.setData({
            sGrade : e.detail.value
          })
      },
      _handleSaveCL(e) {
          this.setData({
            sCollege : e.detail.value
          })
      },
      _handleSaveMJ(e) {
          this.setData({
            sMajor : e.detail.value
          })
      },
      _cancelEvent() {
          this.setData({
              isShow: !this.data.isShow,
              uID: '',
              sPW: '',
              sName: '',
              sSex: '',
              sAge: '',
              sGrade: '',
              sCollege: '',
              sMajor: ''
          })
      },
      _confirmEvent() {
          this.triggerEvent("confirmEvent");
      }
  }
})