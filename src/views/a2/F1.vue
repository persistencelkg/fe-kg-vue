<script setup lang="ts">

import HelloWorld from "../../components/HelloWorld.vue";
import {useRoute} from "vue-router";
import {defineComponent, onMounted} from "vue";

defineComponent({})

const route = useRoute()

onMounted(() => {
  // 动态获取菜单信息
  console.log('f1 mount route ---》', route.name)
})
</script>

<template>
  <HelloWorld msg="F1 Page"/>
</template>

<style scoped>

</style>