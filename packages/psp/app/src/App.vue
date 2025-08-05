<script setup lang="ts">
import { watchEffect } from 'vue'
import { setLocale } from '@/i18n'

setLocale('en-US')

const { locale } = useI18n()
const router = useRouter()
const isReady = ref(false)

onMounted(async () => {
  await router.isReady()
  isReady.value = true
})

watchEffect(() => {
  document.documentElement.lang = locale.value
  if (locale.value.startsWith('ar')) {
    document.documentElement.dir = 'rtl'
  }
})
</script>

<template>
  <div v-if="!isReady" class="splash">
    Loading...
  </div>
  <RouterView />
</template>

<style>
@import './assets/style.css';

.v-enter-active {
  transition: opacity 0.25s, translate 0.25s;
}

.v-enter-from {
  opacity: 0;
  translate: 0 10px;
}
</style>
