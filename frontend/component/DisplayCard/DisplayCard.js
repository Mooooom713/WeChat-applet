Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 地点还是任务长度
    placeholder: {
      type: String,
      value: ''
    },
    // 值
    place: {            // 属性名
      type: String,     // 类型（必填）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 时间
    time: {
      type: String,
      value: ''
    },
    // 发起人
    createBy: {
      type: String,
      value: ''
    },
    //是否展示
    isHidden: {
      type: Boolean,
      value: false
    },
    // 内容
    content: {
      type: String,
      value: ''
    },
    // 是否参加
    isPaticipanted: {
      type: String,
      value: '参加'
    },
    // Class
    activeClass: {
      type: String,
      value: ''
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    _handleClickJoin() {
      this.triggerEvent("submitJoinEvent")
    }
  }
})