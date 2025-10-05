import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { TimeRemaining } from '@/types'

const useEventTime = defineStore('eventTime', () => {
  const now = new Date()

  const startTime = new Date(2025, 10, 5, 19, 30)
  const endTime = new Date(2025, 10, 5, 21, 30)

  const isTooEarly = computed(() => now < startTime)
  const isTooLate = computed(() => now > endTime)
  const isEventOpen = computed(() => !isTooEarly.value && !isTooLate.value)

  function getTimeRemaining(endDate: Date = endTime): TimeRemaining {
    const total = endDate.getTime() - now.getTime()
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))

    return { days, hours, minutes, seconds }
  }

  return {
    isTooEarly,
    isTooLate,
    isEventOpen,
    startTime,
    endTime,
    getTimeRemaining,
  }
})

export default useEventTime
