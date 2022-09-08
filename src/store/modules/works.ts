import http from '@/utils/http';
import { ElMessage } from 'element-plus';
import router from '@/router/index'
import store from '@/store';

const state = {
    title: '',
    infos: [],
    temblog: ''
}
const getters = {

}
const mutations = {
    updatetitle(state:any, payload:any) {
        state.title = payload;
    },
    updateinfos(state:any, payload:any) {
        state.infos = payload;
    },
    updateTemBlog(state:any, payload:any) {
        state.temblog = payload;
    }
}

const actions = {
    update(context:any, payload:any) {
        let formData = new FormData();
        // 挂载到formData中
        for (let attr in payload) {
            if (attr == 'file') {
                for (let i = 0; i < payload[attr].length; i++) {
                    formData.append('files', payload[attr][i])
                }
            } else {
                formData.append(attr, payload[attr])
            }
        }
        return http.post('works/imgstore', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((res:any) => {
                if (res.data.errcode == 0) {
                    ElMessage({
                        type: 'success',
                        message: '更新成功'
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: '更新失败'
                    })
                }
            })
    },
    list(context:any, payload:any) {
        return http.get('/works/getimgs', payload).then((res:any) => {
            return res;
        }).catch((err:any) => {
            console.log(err);
        })
    },
    renewtitle(context:any, payload:any) {
        context.commit('updatetitle', payload)
    },
    renewinfo(context:any, payload:any) {
        return http.get('/works/getAll').then((res:any) => {
            if (res.data.errcode == 0) {
                context.commit('updateinfos', res.data.data)
            }
        }).catch((err:any) => {
            console.log(err);
            ElMessage({
                type: "error",
                message: "数据获取错误"
            })
        })
    },
    createTemAdd(context:any, payload:any) {
        return http.post('works/createAddress').then((res:any) => {
            console.log(res)
        })
    },
    deleteItem(context:any, payload:any) {
        delete payload.infos.worksurl
        return http.delete('works/deleteNowItem', payload).then((res:any) => {
            if (res.data.errcode == 0) {
                ElMessage({
                    type: 'success',
                    message: '删除成功'
                })
            }
        })
    },
    deleteNowImg(context:any, payload:any) {
        return http.post('works/deletenowimg', payload).then(async (res:any) => {
            if (res) {
                await store.dispatch('works/renewinfo')
                ElMessage({
                    type: 'success',
                    message: '删除成功'
                })
            } else {
                ElMessage({
                    type: 'success',
                    message: '删除失败'
                })
            }
        }).catch((err:any) => {
            ElMessage({
                type: 'success',
                message: '删除失败'
            })
        })
    },
    alterSingleImg(context:any, payload:any) {
        let formData = new FormData();
        // 挂载到formData中
        for (let attr in payload) {
            if (attr == 'newfile') {
                formData.append('file', payload[attr])
            } else {
                formData.append(attr, payload[attr])
            }
        }
        return http.post('works/alterimg', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(async (res:any) => {
            if (res.data.errcode == 0) {
                await store.dispatch('works/renewinfo');
                return res.data.newimgurl;
            }
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