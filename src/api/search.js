import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
        needNewCode: 1,
        platform: 'h5',
        uin: 0,
        format: 'json'
    })

    return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
    const url = '/api/getSearchResult'

    const data = Object.assign({}, commonParams, {
        w: query,
        needNewCode: 1,
        platform: 'h5',
        uin: 0,
        format: 'json',
        zhidaqu: 1,
        catZhida: zhida ? 1 : 0,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage,
        n:perpage,
        p: page,
        remoteplace: 'txt.mqq.qll'
    })

    return axios.get(url, {params: data}).then((res) => {
        return Promise.resolve(res.data)
    })
}