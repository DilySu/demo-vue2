import request from "@/utils/request";

/**
 * 获取信息列表
 * @param params
 * @returns {*}
 */
export function getInfoList(params) {
    return request({
        url: "/info",
        method: 'GET',
        params
    })
}

/**
 * 新增 post
 * 修改 put
 * @param data
 * @returns {*}
 */
export function addOrUpdateInfo(type, data) {
    return request({
        url: "/info",
        method: type,
        data
    })
}

/**
 * 删除
 * @param id
 * @returns {*}
 */
export function deleteInfo(id) {
    console.log(id)
    return request({
        url: "/info/" + id,
        method: 'DELETE',
    })
}