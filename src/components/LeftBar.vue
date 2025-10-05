<template>
  <div class="left-bar">
    <h3>{{ $t('messageHidden') }}</h3>
    <ul>
      <li v-for="msg in remaining" :key="msg">???</li>
    </ul>
    <h3>{{ $t('messageDiscovered') }}</h3>
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

defineProps<Props>()
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
