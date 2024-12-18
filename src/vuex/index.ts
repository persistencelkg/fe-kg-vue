import {createPinia} from 'pinia'

// 动态解析当前modules下的ts文件，统一进行状态管理，无需手动加入
const dynamicParseModuleFile = import.meta.glob('./modules/*.ts')

const modules: Record<string, any> = {}

for (const path in dynamicParseModuleFile) {
    const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
    const module = dynamicParseModuleFile[path] as any
    modules[moduleName] = module.default || module
}


const pina = createPinia()

export default pina
// 在pina中getters放入modules 管理
export {modules}