import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'
let bookModel = new BookModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */


  data: {
    book: null,
    comments: [],
    likeStatus: 0,
    likeCount: 0,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookId = options.bookId
    bookModel.getBookDetail(bookId, (res) => {
      this.setData({
        book: res
      })
    })

    bookModel.getComments(bookId, (res) => {
      this.setData({
        comments: res.comments
      })
    })

    bookModel.getLikeStatus(bookId, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },


  onLike(event) {
    var behavior = event.detail.behavior
    likeModel.like(behavior, this.data.book.id, 400)
  },


  onFakePost(event) {
    this.setData({
      isShow: true
    })
  },

  onCancel(event) {
    this.setData({
      isShow: false
    })
  },

  onPost(event) {
    let content = event.detail.value || event.detail.text
    bookModel.postComment(this.data.book.id, content)
    this.data.comments.unshift({
      content: content,
      nums:1
    })
    this.setData({
      comments: this.data.comments
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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