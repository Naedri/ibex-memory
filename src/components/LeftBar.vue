<template>
  <aside class="w-[200px] p-4 border-r border-border h-screen overflow-y-auto">
    <h3 class="text-lg font-semibold mb-2 capitalize">{{ $t('message') }}</h3>
    <ul class="space-y-1">
      <li
        v-for="(msg, index) in messages"
        :key="index"
        class="bg-surface/50 rounded px-2 py-1 text-center transition-all duration-500"
        :class="msg.disclosed ? 'text-text' : 'text-muted'"
      >
        {{
          msg.disclosed
            ? msg.message
            : $t('messageUndisclosed', { emoji: emojis[index % emojis.length] })
        }}
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import type { CardMessage } from '@/types'

interface Props {
  messages: CardMessage[]
}

defineProps<Props>()

const emojis = ['🐙', '🌵', '🎩', '🐍', '🍕', '🚀', '🌸', '⚡', '🎵', '🦄']
</script>
