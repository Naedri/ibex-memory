<template>
  <div class="card" :class="{ flipped: isFlipped || matched }" @click="flipCard">
    <img v-if="isFlipped || matched" :src="imageSrc" alt="Memory card" />
    <div v-else class="card-back"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

interface Props {
  imageSrc: string
  matched: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'flip'): void
}>()

const isFlipped = ref(false)

function flipCard(): void {
  if (!isFlipped.value && !props.matched) {
    isFlipped.value = true
    emits('flip')
  }
}
</script>

<style>
.card {
  width: 100px;
  height: 140px;
  cursor: pointer;
}
.card-back {
  background: gray;
  width: 100%;
  height: 100%;
}
.flipped {
  border: 2px solid green;
}
</style>
