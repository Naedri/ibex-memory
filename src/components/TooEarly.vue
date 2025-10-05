<template>
  <div class="text-center p-8 bg-success/20 rounded-xl max-w-[500px] mx-auto">
    <h2 class="text-2xl font-semibold mb-4">{{ $t('tooEarlyTitle') }}</h2>
    <p class="mb-6">{{ $t('tooEarlyDescription') }}</p>
    <div class="text-lg font-medium">
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
