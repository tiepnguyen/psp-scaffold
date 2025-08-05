<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  searching?: boolean
}>()

const input = useTemplateRef('input')
const text = defineModel({ default: '' })

function clear() {
  input.value?.focus()
  text.value = ''
}
</script>

<template>
  <div class="relative">
    <div v-show="text" class="search-clear" @click="clear">
      <IconX :size="16" />
    </div>
    <input
      ref="input" v-model="text" v-bind="$attrs"
      type="search" name="search" class="form-input" :class="searching" autocomplete="off"
      @focus="(e) => (e.target as HTMLInputElement).select()"
    >
  </div>
</template>

<style>
.search-clear {
  position: absolute;
  top: 50%;
  inset-inline-end: 0.5rem;
  padding: 0.25rem;
  border-radius: 50%;
  transform: translateY(-50%);

  &:hover {
    background: #eee;
  }

}
</style>
