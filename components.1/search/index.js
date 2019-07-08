import {KeywordModel} from "../../models/keyword.js"
import {BookModel} from "../../models/book.js"
const keywordModer = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      observer:"loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyList:[],
    hotList:[],
    dataArray:[],
    searching:false,
    value:''
  },
  attached(){
    let historyList = keywordModer.getHistory()
    keywordModer.getHot(res => {
      this.setData({
        hotList:res.hot
      })
    })
    this.setData({
      historyList:historyList
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      let length = this.data.dataArray.length
      bookModel.search(length, this.data.value, (res) => {
        let tempArray = this.data.dataArray.concat(res.books)
        this.setData({
          dataArray:tempArray
        })
      })
    },
    onCancel(){
      this.triggerEvent('cancel', {}, {})
    },
    
    onConfirm(event){
      this.setData({
        searching:true
      })
      var value = event.detail.value ||event.detail.text
      keywordModer.addToHistory(value)
      bookModel.search(0, value, (res) => {
        this.setData({
          dataArray: res.books,
          value:value
        })
      })
    }
  }
})
