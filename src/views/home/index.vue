<script setup lang="ts">
import BasicLayout from "../../components/layout/BasicLayout.vue"
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons-vue'
import {defineComponent, onMounted, ref, watch} from "vue"
import {useRoute, useRouter} from "vue-router"
// 可胜率
defineComponent({})


//路由mock
const menuItems = ref([
  {
    id: 1,
    name: '系统导航',
    icon: UserOutlined,
    path: '/a2' // 对应路由的path 要1:1
  },
  {
    id: 2,
    name: '日志管理',
    icon: VideoCameraOutlined,
    path: '/a3'
  },
  {
    id: 3,
    name: '数据分析',
    icon: UploadOutlined,
    path: '/'
  },
])

const router = useRouter()
const route = useRoute()

// 启动只初始化1次，重新加载初始化1次
onMounted(() => {
  // 动态获取菜单信息
  console.log('home/index.vue ---》', route.name)
})

const cachedViews = ref<string[]>([])
// 路由变化时更新缓存
watch(() => route.path, (newPath) => {
  // console.log('路由变化：', route.path, newPath);
  if (!cachedViews.value.includes(newPath)) {
    cachedViews.value.push(newPath)  // 添加当前路由到缓存
  }
  // console.log('缓存视图：', cachedViews.value);
})

// 菜单点击事件
const menuClicked = (/*@vite-ignore item:any, key:number,*/ keyPath:string) => {
  // console.log(item, keyPath, route.path)
  // 跳转到菜单配置的path地址
  if (route.path !== '/'.concat(keyPath) || route.path !== keyPath) {
    // replace 不会缓存到history 这样点击上一步是回不去的，默认是
    router.push({ path: keyPath})
  }
}
</script>


<template>
  <BasicLayout>
    <template #menuSlot>
      <a-menu-item v-for="item in menuItems" :key="item.id" @click="menuClicked(item.path)">
        <component :is="item.icon"/>
        <span>{{ item.name }}</span>
      </a-menu-item>
    </template>
    <template #contentSlot>
      <router-view/>
<!--      下面这个做法每次从根目录出发访问是没有问题的，一旦子路由自己互相访问，就会丢失渲染，看起来都是内容区都是空白页 -->
<!--      <router-view v-slot="{ Component }">-->
<!--        <transition name="fade-transform" mode="out-in">-->
<!--          <keep-alive>-->
<!--            <component :is="Component"/>-->
<!--          </keep-alive>-->
<!--        </transition>-->
<!--      </router-view>-->
    </template>

  </BasicLayout>

</template>