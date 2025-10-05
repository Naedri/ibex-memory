<template>
  <div class="fixed top-5 right-5 z-[1000] max-w-[350px] w-full">
    <transition-group name="notif-list">
      <div
        v-for="(notification, index) in notifications"
        :key="notification.id"
        :class="[
          'px-5 py-3 mb-2 rounded-lg font-medium cursor-pointer shadow-md text-white',
          notification.type === 'info' ? 'bg-primary' : '',
          notification.type === 'warn' ? 'bg-warning' : '',
          notification.type === 'error' ? 'bg-error' : '',
        ]"
        @click="removeNotification(index)"
      >
        {{ notification.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import type { Notification, Notifier } from '@/types'

const notifications = ref<Notification[]>([])
let idCounter = 0

const notif: Notifier = {
  info: (message: string) => {
    notifications.value.push({ id: idCounter++, message, type: 'info' })
    autoRemoveNotification()
  },
  warn: (message: string) => {
    notifications.value.push({ id: idCounter++, message, type: 'warn' })
    autoRemoveNotification()
  },
  error: (message: string) => {
    notifications.value.push({ id: idCounter++, message, type: 'error' })
    autoRemoveNotification()
  },
}

defineExpose({ notif })

const autoRemoveNotification = () => {
  setTimeout(() => {
    if (notifications.value.length > 0) {
      notifications.value.shift()
    }
  }, 3000)
}

const removeNotification = (index: number) => {
  notifications.value.splice(index, 1)
}
</script>

<style scoped>
.notif-list-enter-from,
.notif-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.notif-list-enter-active,
.notif-list-leave-active {
  transition: all 0.5s ease;
}
.notif-list-enter-to,
.notif-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
