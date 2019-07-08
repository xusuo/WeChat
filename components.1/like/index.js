
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number,
    readOnly:Boolean
  },

  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  methods: {
    onLike: function (event) {
      if(this.properties.readOnly){
        return
      }
      let count = this.properties.count
      let like = this.properties.like
      count = this.properties.like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like
      })
      //自定义事件
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})

