// components/toast/index.js
Component({
  properties: {              //定义组件属性
    toastData: {           //用来显示提示信息
      type: Object,         // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: {
        icon: 'success'
      }     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
  },
  data: {
    hide: true
  },
  methods: {
    showToast: function () {
      let that = this;
      that.setData({
        hide: false
      });
    },
    hideToast: function (e) {
      let that = this;
      setTimeout(function () {
        that.setData({
          hide: true
        });
      }, 2000);
    }
  }
})