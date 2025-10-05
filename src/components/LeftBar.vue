<template>
  <aside class="w-[200px] p-4 border-r border-border h-screen overflow-y-auto">
    <h3 class="text-lg font-semibold mb-2">{{ $t('messageHidden') }}</h3>
    <ul class="mb-4 space-y-1">
      <li
        v-for="(msg, index) in remaining"
        :key="msg"
        class="bg-surface/50 rounded px-2 py-1 text-center text-muted overflow-hidden transition-all duration-500"
      >
        {{ emojis[index % emojis.length] }} ?
      </li>
    </ul>
    <h3 class="text-lg font-semibold mb-2">{{ $t('messageDiscovered') }}</h3>
    <ul class="space-y-1">
      <li
        v-for="msg in discovered"
        :key="msg"
        class="bg-surface/50 rounded px-2 py-1 text-center text-text overflow-hidden transition-all duration-500 max-h-10"
      >
        {{ msg }}
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
interface Props {
  remaining: string[]
  discovered: string[]
}

defineProps<Props>()

const emojis = ['🐙', '🌵', '🎩', '🐍', '🍕', '🚀', '🌸', '⚡', '🎵', '🦄']
</script>
