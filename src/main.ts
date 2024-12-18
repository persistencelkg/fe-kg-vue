import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import pina from './vuex'

const app = createApp(App);
app.use(Antd).use(pina).mount('#app')
