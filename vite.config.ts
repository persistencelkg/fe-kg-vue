import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as process from 'process';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const envDir = './src/config/env';
    const env = loadEnv(mode, process.cwd(), '')
    // console.log('aaa', env) //获取系统所有环境变量
    return {
        plugins: [vue()],
        envDir: envDir,
        define: {
            //
            'process.env': env ,
            // __APP_ENV__: JSON.stringify(env.APP_ENV),
        }
    }
})
