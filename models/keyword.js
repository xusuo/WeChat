import {HTTP} from "../utils/http.js"

class KeywordModel extends HTTP{
    key = 'q'
    maxLength = 10
    getHistory() {
        let words = wx.getStorageSync(this.key)
        if (!words) {
            words = []
            return words
        }
        return words

    }

    getHot(callBack) {
        this.request({
            url:"/book/hot_keyword",
            success:(res) => {
                callBack(res)
            }
        })
    }

    addToHistory(keyword) {
        let words = this.getHistory()
        let has = words.includes(keyword)
        if (!has) {
            let length = words.length
            if(length>=this.maxLength){
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }
    }
}

export {
    KeywordModel
}