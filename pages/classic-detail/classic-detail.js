import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cid: Number,
    type: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    classic: null,
    likeCount:0,
    likeStatus:false
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options) {
      const cid = this.options.cid
      const type = this.options.type
      classicModel.getById(cid, type,res=>{
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
        }) 
      })
    },

    _getLikeStatus: function (artID, category) {
      likeModel.getClassicLikeStatus(artID, category,
        (res) => {
          this.setData({
            likeCount: res.fav_nums,
            likeStatus: res.like_status
          })
        })
    },
  }
})