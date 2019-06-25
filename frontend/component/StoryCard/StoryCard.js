Component({
    options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     * 用于组件自定义设置
     */
    properties: {
      // 地点
      ceng: {            // 属性名
        type: String,     // 类型（必填）
        value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
      },
      // 时间
      storyName :{
        type : String ,
        value : ''
      },
      // 发起人
      storyNumbers :{
        type : String ,
        value : ''
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
        _navToDetail () {
            this.triggerEvent("navToDetail")
        }
    }
  })