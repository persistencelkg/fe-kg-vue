import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import pina from './vuex'
import {router} from './vuex/modules/vue-router.ts'

const app = createApp(App);
app.use(Antd).use(pina).use(router).mount('#app')
