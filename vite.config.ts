import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as process from 'process';
import * as path from "path";

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const envDir = './src/config/env';
    const env = loadEnv(mode, process.cwd(), '')
    // console.log('aaa', env) //获取系统所有环境变量
    console.log('url', path.resolve(__dirname))
    return {
        plugins: [vue()],
        envDir: envDir,
        define: {
            //
            'process.env': env ,
            // __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'), // 确保 @ 指向 src
            },
        },
        server: {
            // port: 5371,

            // proxy:{
            //     "/api-name": {
            //         target: "http://localhost:9000",
            //         changeOrigin: true,
            //         rewrite: (path) => path.replace(/^\/api-name/, '')
            //     }
            // }
        }
    }
})
