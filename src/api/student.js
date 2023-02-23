import request from "@/utils/request";

/**
 * 学生列表查询接口
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getStudentList(params){
    return request({
        url: "/students",
        method: 'GET',
        params
    })
}

export function deleteStudent(id){
    return request.delete("/students/"+id )
}