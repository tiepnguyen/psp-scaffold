<script setup lang="ts">
const props = defineProps<{
  submit?: boolean
  primary?: boolean
  secondary?: boolean
  destructive?: boolean
  outline?: boolean
  plain?: boolean
}>()

const type = computed(() => props.submit ? 'submit' : 'button')
const variants = computed(() => ({
  'btn-primary': props.primary,
  'btn-secondary': props.secondary,
  'btn-destructive': props.destructive,
  'btn-outline': props.outline,
  'btn-plain': props.plain,
}))
</script>

<template>
  <button :type class="btn" :class="variants">
    <slot />
  </button>
</template>
