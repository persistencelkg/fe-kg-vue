<!--  <HelloWorld msg="LKG"/>-->

<script setup lang="ts">
import BasicLayout from "../../components/layout/BasicLayout.vue";
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons-vue';
import {defineComponent, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

// 改行为会影响 route 路由结果
defineComponent({})


//

const menuItems = ref([
  {
    key: 1,
    name: '系统导航',
    icon: UserOutlined,
    path: '/a2path' // 对应路由的path 要1:1
  },
  {
    key: 2,
    name: '日志管理',
    icon: VideoCameraOutlined,
    path: 'a3'
  },
  {
    key: 3,
    name: '数据分析',
    icon: UploadOutlined,
    path: '/'
  },
])

const router = useRouter()
const route = useRoute()

onMounted(() => {
  // 动态获取菜单信息
  console.log('主route ---》', route.name)
})

const cachedViews = ref<string[]>([])
// 路由变化时更新缓存
watch(() => route.path, (newPath) => {
  if (!cachedViews.value.includes(newPath)) {
    cachedViews.value.push(newPath)  // 添加当前路由到缓存
  }
  // console.log('缓存视图：', cachedViews.value);
})

// 菜单点击事件
const menuClicked = (item, key, keyPath) => {
  console.log(item, key, keyPath, route.path)
  // 跳转到菜单配置的path地址
  if (route.path !== '/'.concat(keyPath) || route.path !== keyPath) {
    router.push({ path: keyPath })
  }

}

</script>


<template>
  <BasicLayout>
    <template #menuSlot>
      <a-menu-item v-for="item in menuItems" :key="item.key" @click="menuClicked(item, item.key, item.path)">
        <component :is="item.icon"/>
        <span>{{ item.name }}</span>
      </a-menu-item>
    </template>
    <template #contentSlot>
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.path"/>
          </keep-alive>
        </transition>
      </router-view>
    </template>

  </BasicLayout>

</template>