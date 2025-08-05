<script setup lang="ts">
import { IconMenu2 } from '@tabler/icons-vue'

defineProps<{
  title: string
}>()

const showSidebar = defineModel('showSidebar', { default: false })
</script>

<template>
  <div class="app-header">
    <div class="lg:hidden">
      <Button plain class="size-10" @click="showSidebar = true">
        <IconMenu2 />
      </Button>
    </div>

    <div class="text-lg">
      {{ title }}
    </div>

    <slot name="trailing" />
  </div>
</template>

<style>
@layer components {
  .app-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    position: sticky;
    inset: 0;
    height: var(--app-header-height);
    padding: 0 1.5rem;
    background: #fff;
    z-index: 1;

    > *:last-child {
      margin-inline-start: auto;
    }
  }
}
</style>
