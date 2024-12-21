<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// const lkg = ref(import.meta.env.VITE_LKG)
// const wkx =  ref(import.meta.env.WKX)

import {useRoute} from "vue-router";
import {watch} from "vue";
import BasicLayout from "./components/layout/BasicLayout.vue";
import Index from "./views/home/index.vue";

const route = useRoute();

watch(() => route.path, (newPath) => {
  console.log('APP.vue：', route.path, newPath);
});

</script>

<template>
<!--  <div>-->
<!--    &lt;!&ndash;    <a href="https://vite.dev" target="_blank">&ndash;&gt;-->
<!--    &lt;!&ndash;      <img src="/vite.svg" class="logo" alt="Vite logo" />&ndash;&gt;-->
<!--    &lt;!&ndash;    </a>&ndash;&gt;-->
<!--    &lt;!&ndash;    <a href="https://vuejs.org/" target="_blank">&ndash;&gt;-->
<!--    &lt;!&ndash;      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />&ndash;&gt;-->
<!--    &lt;!&ndash;    </a>&ndash;&gt;-->
<!--    LKG:{{ lkg }}-->
<!--    WKX:{{ wkx}}-->
<!--  </div>-->
  <router-view/>

<!--  <Index/>-->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}


</style>
