<template>
  <div class="card" :class="{ flipped: flipped || matched }" @click="flipCard">
    <img v-if="flipped || matched" :src="imageUrl" alt="Card" class="w-full h-full object-cover" />
    <div v-else class="card-back"></div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  imageUrl: string
  flipped: boolean
  matched: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'flip'): void
}>()

function flipCard(): void {
  if (!props.flipped && !props.matched) {
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
