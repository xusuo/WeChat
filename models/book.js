import {
    HTTP
} from '../utils/http.js'

class BookModel extends HTTP {

    search(start, q, callBack) {
        this.request({
            url: "book/search?summary=1",
            data: {
                q: q,
                start: start
            },
            success:(res) => {
                callBack(res)
            }
        })
    }

    getMyBookCount(callBack) {
        this.request({
            url: '/book/favor/count',
            success: (res) => {
                callBack(res)
            }
        })
        // return this.request({
        //     url: '/book/favor/count'
        // })
    }

    getHotList(callBack) {
        this.request({
            url: '/book/hot_list',
            success: (res) => {
                callBack(res)
            }
        })
    }

    getBookDetail(bookId, callBack) {
        this.request({
            url: '/book/' + bookId + '/detail',
            success: (res) => {
                callBack(res)
            }
        })
    }

    getComments(bookId, callBack) {
        this.request({
            url: '/book/' + bookId + '/short_comment',
            success: (res) => {
                callBack(res)
            }
        })
    }

    getLikeStatus(bookId, callBack) {
        this.request({
            url: '/book/' + bookId + '/favor',
            success: (res) => {
                callBack(res)
            }
        })
    }

    postComment(bookId, content) {
        this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bookId,
                content: content
            }
        })

    }

   
}

export {
    BookModel
}