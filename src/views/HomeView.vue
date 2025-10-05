<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <TooLate v-if="eventTime.isTooLate && !isTimeUp" />
    <TooEarly v-else-if="eventTime.isTooEarly && !isTimeUp" />
    <template v-else>
      <h1 class="text-3xl font-bold mb-6">{{ $t('gameName') }}</h1>
      <p class="max-w-xl text-base-700">
        {{ $t('gameDescriptionPlayer', { player: playerName }) }}
      </p>
      <p class="max-w-xl text-base-700 mb-6">
        {{ $t('gameDescription') }}
      </p>
      <div class="flex flex-wrap gap-2 mb-4">
        <router-link
          v-for="[name, deck] in decks"
          :key="name"
          :to="{ name: 'Game', query: { deckName: name } }"
          class="btn-primary"
        >
          {{
            $t('deckDescription', {
              author: deck.getAuthor(),
              size: deck.getSize(),
            })
          }}
        </router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDeckStore, useEventTime } from '@/stores'
import { TooLate, TooEarly } from '@/components'
import type { Deck } from '@/models'

const decks = ref<Map<string, Deck>>(new Map())
const deckStore = useDeckStore()
const eventTime = useEventTime()
const route = useRoute()
const isTimeUp = ref(false)
const playerName = ref('Tom')

onMounted(async () => {
  isTimeUp.value = route.query.timeUp === 'true'
  const name = route.query.player as string
  playerName.value = name ? name : 'Tom Sawyer'
  if (deckStore.isEmpty()) await deckStore.loadDecks()
  decks.value = deckStore.getDecks()
})
</script>
