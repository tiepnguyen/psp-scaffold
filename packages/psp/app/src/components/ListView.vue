<script setup lang="ts">
defineProps<{
  data: any[]
  itemKey?: string
}>()
</script>

<template>
  <ul class="list-view">
    <li v-for="(item, index) in data" :key="item[itemKey || 'id'] ?? index">
      <slot name="default" v-bind="{ item, index }">
        {{ item }}
      </slot>
    </li>
  </ul>
</template>
