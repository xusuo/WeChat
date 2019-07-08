import {
    HTTP
} from '../utils/http.js'

class ClassicModel extends HTTP {
    getLatest(callBack) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                callBack(res)                
                this._setLatestIndex(res.index)
            }
        })
    }

    // getPrev(index,callBack){
    //     this.request({
    //         url: 'classic/' + index + '/previous',
    //         success: (res) => {
    //             callBack(res)
    //         }
    //     })
    // }

    getClassic(index, nextOrPrevious, callBack) {
        let key = nextOrPrevious == 'next'?this._getKey(index + 1):this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        if(!classic){
            this.request({
                url: 'classic/' + index + '/' + nextOrPrevious,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index),res)
                    callBack(res)
                }
            })
        }else{
            callBack(classic)
        }
      
    }

 

    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return index == latestIndex ? true : false
    }

    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }

    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }

    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }

    _getKey(index){
        let key = 'classic-'+index
        return key
    }

}

export {
    ClassicModel
}