<template>
  <div class="too-late-container">
    <h2>{{ $t('tooLateTitle') }}</h2>
    <p>{{ $t('tooLateDescription') }}</p>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.too-late-container {
  text-align: center;
  padding: 2rem;
  background-color: #ffebee;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
}
</style>
