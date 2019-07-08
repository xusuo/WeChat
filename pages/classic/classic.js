import {ClassicModel} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },

  onLike: function (event) {
    var behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext: function (event) {
    this._updataClassic('next')
  },
  onPrev: function (event) {
    this._updataClassic('previous')
    // let index = this.data.classic.index
    // classicModel.getPrev(index, (res) => {
    //   this.setData({
    //     classic: res,
    //     first: classicModel.isFirst(res.index),
    //     latest: classicModel.isLatest(res.index)
    //   })
    // })
  },

  _updataClassic: function (nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
    })
  },

  _getLikeStatus(art_id, type){
    likeModel.getClassicLikeStatus(art_id, type, (res) => {
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },


  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})