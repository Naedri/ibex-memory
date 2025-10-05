<template>
  <div class="notif-container">
    <transition-group name="notif-list">
      <div
        v-for="(notification, index) in notifications"
        :key="notification.id"
        class="notif"
        :class="notification.type"
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
.notif-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 350px;
  width: 100%;
}

.notif {
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.notif.info {
  background-color: #2196f3;
}

.notif.warn {
  background-color: #ff9800;
}

.notif.error {
  background-color: #f44336;
}

/* Animations */
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
