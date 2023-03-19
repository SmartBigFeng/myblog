import http from '@/utils/http';
import { CommentApi } from 'undraw-ui'
interface remarkCommentApi extends CommentApi {
    blogId: string
}
interface authIT {
    _id: string,
    authed: boolean
}
interface blogRemarkBody {
    blogId:string
}
export default class remarkApi {
    static getRemark = (params:blogRemarkBody) => {
        return http.get(
            '/remark/getRemarkList', params
        )
    }
    static postRemark = (data: remarkCommentApi) => {
        return http.post(
            '/remark/postRemark', data
        )
    }
    static getAllRemark = () => {
        return http.get(
            '/remark/getTotalList'
        )
    }
    static authRemark = (data:authIT)=>{
        return http.post(
            '/remark/authRemark',data
        )
    }
}