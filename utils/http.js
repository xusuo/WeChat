import {config} from '../config.js'
class HTTP {
    request(params) {
        if (!params.method) {
            params.method = "GET"
        }
        wx.request({
            url: config.api_base_url + params.url,
            method: params.method,
            data: params.data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                   params.success && params.success(res.data)
                } else {
                    wx.showToast({
                        title: '错误',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: () => {
                wx.showToast({
                    title: '错误',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    }
}

export {
    HTTP
}