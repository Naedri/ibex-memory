import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { TimeRemaining } from '@/types'

const useEventTime = defineStore('eventTime', () => {
  const nowTime = new Date()

  const startTime = new Date(2025, 9, 5, 19, 30)
  const endTime = new Date(2025, 9, 6, 21, 30)

  const isTooEarly = computed(() => nowTime < startTime)
  const isTooLate = computed(() => nowTime > endTime)
  const isEventOpen = computed(() => !isTooEarly.value && !isTooLate.value)
  const timeRemaining = computed(() => getTimeRemaining())

  function getTimeRemaining(nowDate: Date = nowTime, dDate: Date = startTime): TimeRemaining {
    const total = dDate.getTime() - nowDate.getTime()
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
    timeRemaining,
  }
})

export default useEventTime
