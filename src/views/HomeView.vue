<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <TooLate v-if="eventTime.isTooLate" />
    <TooEarly v-else-if="eventTime.isTooEarly" />
    <template v-else>
      <h1 class="text-3xl font-bold mb-6">{{ $t('gameName') }}</h1>
      <div class="flex flex-wrap gap-2 mb-4">
        <router-link
          v-for="n in totalDecks"
          :key="n"
          :to="{ name: 'Game', query: { deckIndex: n - 1 } }"
          class="btn-primary"
        >
          {{ $t('deck') }} {{ n }}
        </router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useDeckStore, useEventTime } from '@/stores'
import { TooLate, TooEarly } from '@/components'

const totalDecks = ref(0)
const deckStore = useDeckStore()
const eventTime = useEventTime()

onMounted(async () => {
  if (deckStore.decks.length === 0) await deckStore.loadDecks()
  totalDecks.value = deckStore.decks.length
})
</script>
