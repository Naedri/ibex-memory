<template>
  <div
    class="card-base w-[100px] h-[140px] cursor-pointer transition-transform duration-300"
    :class="{
      'rotate-y-180': flipped || matched,
      'border-2 border-success': flipped,
    }"
    @click="handleClick"
  >
    <img
      v-if="flipped || matched"
      :src="imageUrl"
      alt="Card"
      class="w-full h-full object-cover rounded-xl"
    />
    <div
      v-else
      class="w-full h-full bg-muted rounded-xl flex items-center justify-center text-white font-semibold select-none"
    >
      ?
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  imageUrl: string
  flipped: boolean
  matched: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'reveal'): void
}>()

function handleClick(): void {
  if (!props.flipped && !props.matched) emit('reveal')
}
</script>
