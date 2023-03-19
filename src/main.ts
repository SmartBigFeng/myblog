import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
const app = createApp(App);
for (const attr in Icons) {
    app.component(attr, Icons[attr as keyof typeof Icons]);
}
app.use(store)
    .use(router)
    .use(ElementPlus)
    .use(UndrawUi)
    .mount('#app')
window.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key == 'Enter') {
        e.preventDefault();
    }
}
)