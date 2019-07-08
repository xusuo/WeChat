import {HTTP} from '../utils/http.js'
class LikeModel extends HTTP {
    like(behavior, art_id, type) {
        let url = behavior == 'like' ? 'like' : 'like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: art_id,
                type: type
            }
        })
    }

    getClassicLikeStatus(art_id, type, callBack){
        this.request({
            url: 'classic/'+type+'/'+art_id+'/favor',
            success: (res) => {
                callBack(res)
            }
        })
    }
}

export {
    LikeModel
}