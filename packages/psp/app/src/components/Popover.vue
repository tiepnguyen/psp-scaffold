<script setup lang="ts">
const Popover = defineAsyncComponent({
  loader: async () => import('floating-vue').then(m => m.Dropdown),
  loadingComponent: h('div', { class: 'popover-loading' }, useSlots().default?.()),
  delay: 0,
})
</script>

<template>
  <Popover popper-class="popover">
    <slot name="default" />
    <template #popper="{ hide }">
      <slot name="popper" :hide="hide" />
    </template>
  </Popover>
</template>

<style>
@import 'floating-vue/dist/style.css';

.popover-loading {
  opacity: 0.5;
}

.v-popper--theme-dropdown .v-popper__inner {
  border-radius: 0.75rem;
}
</style>
