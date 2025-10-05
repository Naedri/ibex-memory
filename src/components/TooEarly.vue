<template>
  <div class="too-earlt-container">
    <h2>{{ $t('tooEarlyTitle') }}</h2>
    <p>{{ $t('tooEarlyDescription') }}</p>
    <div class="remaining-time">
      <p>
        {{ $t('timeRemaining') }}: {{ timeDiff.days }} {{ $t('days') }}, {{ timeDiff.hours }}
        {{ $t('hours') }}, {{ timeDiff.minutes }} {{ $t('minutes') }}, {{ timeDiff.seconds }}
        {{ $t('seconds') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEventTime } from '@/stores'

const eventTime = useEventTime()
const timeDiff = eventTime.getTimeRemaining()
</script>

<style scoped>
.too-early-container {
  text-align: center;
  padding: 2rem;
  background-color: #e8f5e9;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
}
</style>
