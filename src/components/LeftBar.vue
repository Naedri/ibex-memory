<template>
  <div class="left-bar">
    <h3>Messages à découvrir</h3>
    <ul>
      <li v-for="msg in remaining" :key="msg">{{ msg }}</li>
    </ul>
    <h3>Messages découverts</h3>
    <ul>
      <li v-for="msg in discovered" :key="msg">{{ msg }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  remaining: string[]
  discovered: string[]
}

const props = defineProps<Props>()
</script>

<style>
.left-bar {
  width: 200px;
  padding: 10px;
  border-right: 1px solid #ccc;
  height: 100vh;
  overflow-y: auto;
}
</style>
