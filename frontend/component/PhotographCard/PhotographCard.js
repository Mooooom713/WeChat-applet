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
        imgUrls: { // 属性名
            type: Array, // 类型（必填）
            value: ['/pages/picture/test.jpg', '/pages/picture/testActive.jpg'] // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
        user: {
            type: String,
            value: '李爱米'
        },
        content: {
            type: String,
            value: '好开心呀~ 又要老一岁了！！！好开心呀~ 又要老一岁了！！！好开心呀~ 又要老一岁了！！！好开心呀~ 又要老一岁了！！！'
        },
        thumbsNumber: {
            type: Number,
            value: 0
        },
        isShow: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 私有数据,组件的初始数据
     * 可用于模版渲染
     */
    data: {
        activeClass: ''
    },

    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    methods: {
        _handleThumbsUp() {
            this.setData({
                activeClass: this.data.activeClass ? '' : 'active'
            }, () => {
                this.triggerEvent("handleThumbsUp")
            })
        },
        _handleReport() {
            this.triggerEvent("handleReport")
        }
    }
})