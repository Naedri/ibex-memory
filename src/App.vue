<template>
  <NotificationProvider ref="notif-provider" />
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, provide, ref } from 'vue'
import { useDeckStore } from '@/stores'
import { NotificationProvider } from '@/components'
import type { Notifier } from '@/types'

const deckStore = useDeckStore()
const notifProvider = useTemplateRef('notif-provider')

const notif = ref<Notifier>({
  info: (m: string) => console.info(m),
  warn: (m: string) => console.warn(m),
  error: (m: string) => console.error(m),
})
provide('notif', notif)

onMounted(() => {
  deckStore.loadDecks()

  notif.value = {
    info: (message: string) => {
      if (notifProvider.value) notifProvider.value.notif.info(message)
      else console.info(message)
    },
    warn: (message: string) => {
      if (notifProvider.value) notifProvider.value.notif.warn(message)
      else console.warn(message)
    },
    error: (message: string) => {
      if (notifProvider.value) notifProvider.value.notif.error(message)
      else console.error(message)
    },
  }
})
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
