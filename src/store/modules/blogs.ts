import http from '@/utils/http';
import { ElMessage } from 'element-plus';
import router from '@/router/index'
import store from '..';
interface StateType {
    temblog: string,
    allBlogs: [],
    temfile: object
}
interface agreementTpye {
    state: object,
    payload: object
}
interface actionsTpye {
    state: object,
    payload: object
}
const state: StateType = {
    temblog: '',
    allBlogs: [],
    temfile: {}
}
const getters = {

}
const mutations = {
    updateTemBlog(state: any, payload: any) {
        state.temblog = payload;
    },
    updateAllBlogs(state: any, payload: any) {
        state.allBlogs = payload;
    },
    updateteminfo(state: any, payload: any) {
        state.temfile = JSON.parse(JSON.stringify(payload));
    }

}

const actions = {
    createTemBlogs(context: any, payload: any) {
        context.commit('updateTemBlog', payload);
        return {
            "errcode": "0"
        }
    },
    postnewBlog(context: any, payload: any) {
        let formData = new FormData();
        for (let attr in payload) {
            if (attr == 'file') {
                formData.append('file', payload[attr])
            } else {
                formData.append(attr, payload[attr])
            }
        }
        return http.post('blogs/createBlog', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res: any) => {
            if (res.data.errcode == 0) {
                ElMessage({
                    type: 'success',
                    message: '发布成功'
                })
            } else {
                ElMessage({
                    type: "error",
                    message: '发布失败'
                })
            }
        });
    },
    getAllBlogs(context: any, payload: any) {
        return http.post('blogs/getAll', {
            type: payload && payload.type == 'all' ? payload.type : 'all',
            condition: payload == undefined ? {} : payload.condition
        }).then(async(res: any) => {
            if (payload && payload.type == 'all') {
                await context.commit('updateAllBlogs', res.data.data);
            }
            return res.data.data;
        })
    },
    delOneBlog(context: any, payload: any) {
        return http.delete('blogs/deleteOneBlog', payload).then((res: any) => {
            return res;
        })
    },
    temBlogInfo(context: any, payload: any) {
        context.commit('updateteminfo', payload);
    },
    updateBlog(context: any, payload: any) {
        let formData = new FormData();
        for (let attr in payload) {
            if (attr == 'file') {
                formData.append('file', payload[attr])
            } else {
                formData.append(attr, payload[attr])
            }
        }
        return http.post('blogs/renewblog', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}