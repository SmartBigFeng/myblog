import { createStore } from 'vuex'
import works from '@/store/modules/works'
import blogs from '@/store/modules/blogs'
interface RootState {
  [key: string]: any
}
export default createStore<RootState>({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    works,
    blogs
  }
})
