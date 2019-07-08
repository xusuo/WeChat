
const music = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    img:String,
    src: String,
    content:String,
    title:String,
    hidden:Boolean
  },

 
  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc:'images/player@waitting.png',
    palySrc:'images/player@playing.png'
  },

  attached(event) {
    // 跳转页面 当前 切换
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(){
      if(!this.data.playing){
        this.setData({
          playing:true
        })
        music.title = this.properties.title
        music.src = this.properties.src
      }else{
        this.setData({
          playing:false
        })
        music.pause()
      }
     
    },

    _recoverStatus: function () {
      if (music.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (music.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      music.onPlay(() => {
        this._recoverStatus()
      })
      music.onPause(() => {
        this._recoverStatus()
      })
      music.onStop(() => {
        this._recoverStatus()
      })
      music.onEnded(() => {
        this._recoverStatus()
      })
    }


    
  }
})
