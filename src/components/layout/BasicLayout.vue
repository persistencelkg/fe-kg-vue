<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  DeleteOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons-vue'
import {SYSTEM_INFO} from "../../const/const.ts";
import {useRoute} from "vue-router";


const selectedKeys = ref(['1']);
const collapsed = ref(false);

const state = ref({
  theme: 'dark'
})


</script>


<template>
  <a-layout :style="{ height: '100vh', width: '100%' }">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh' }" v-model:collapsed="collapsed">
      <div class="logo">
        <img src="/vite.svg" class="logo_img" alt="Vite logo"/>
        <span class="logo_text" v-show="!collapsed">{{ SYSTEM_INFO.appName }}</span>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" :theme="state.theme" mode="inline">
        <!-- 插槽扩展-->
        <slot name="menuSlot"></slot>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; height: 50px;">
        <MenuUnfoldOutlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
      </a-layout-header>
      <a-layout-content
          :style="{  margin: '12px 10px', padding: '18px', background: '#fff', minHeight: '280px', borderRadius: '4px' }"
      >
        <slot name="contentSlot"></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>


<style>
.trigger {
  display: block;
  font-size: 18px;
  width: 40px;
  line-height: 50px;
  padding: 2px 16px 0 16px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  margin: 9px;
  overflow: hidden;
}

.logo_img {
  margin-left: 12px;
  display: block;
  width: 32px;
  height: 32px;
  float: left;
}

.logo_text {
  display: block;
  float: left;
  line-height: 32px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  margin-left: 8px;
  font-weight: 900;
}


.site-layout .site-layout-background {
  background: #fff;
}

/* 全局布局平铺  */
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0;
}

</style>
