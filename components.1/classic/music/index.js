
const music = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img:String,
    content:String,
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlaying:false,
    pauseSrc:'images/player@waitting.png',
    palySrc:'images/player@playing.png'
  },

  // detached:function(){
  //   music.stop()
  // },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(){
      if(!this.data.isPlaying){
        this.setData({
          isPlaying:true
        })
        music.title = "xs"
        music.src = this.properties.src
      }else{
        this.setData({
          isPlaying:false
        })
        music.pause()
      }
     
    }
  }
})
