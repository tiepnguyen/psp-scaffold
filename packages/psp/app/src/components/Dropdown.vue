<script setup lang="ts" generic="T extends string | number | Record<string, unknown>">
const props = defineProps<{
  options: T[] | Record<string, T>
}>()

const emit = defineEmits<{
  select: [option: T, key: string | number]
  change: [value: EmitValue]
}>()

type EmitValue = typeof props.options extends Record<string, unknown> ? string : T

const selected = defineModel<T | string>('value')
const options = computed(() => props.options as T[])

function isSelected(option: T, key: string | number) {
  if (typeof key === 'string') {
    return selected.value === key
  }
  return selected.value === option
}

function selectOption(option: T, key: string | number, hide: () => void) {
  emit('select', option, key)

  const value = typeof key === 'string' ? key : option

  if (selected.value !== undefined) {
    selected.value = value

    if (value !== selected.value) {
      emit('change', value as EmitValue)
    }
  }

  hide()
}
</script>

<template>
  <Popover popper-class="dropdown">
    <slot name="default" />

    <template #popper="{ hide }">
      <slot name="header" />
      <ul>
        <li
          v-for="(option, key) in options" :key="key"
          :class="{ selected: isSelected(option, key) }"
          @click="selectOption(option, key, hide)"
        >
          <slot name="option" v-bind="{ option, key: key as string | number }">
            {{ option }}
          </slot>
        </li>
      </ul>
      <slot name="footer" />
    </template>
  </Popover>
</template>

<style>
.dropdown {
  .v-popper__inner {
    width: 20rem;
  }

  ul {
    padding: 0.25rem;
    display: grid;
    gap: 0.25rem;
  }

  li {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    border-radius: 0.5rem;
    transition: background-color var(--transition-duration-fast, 0.15s);

    &:hover {
      background: #f5f5f5;
    }

    &.selected {
      font-weight: 500;
      padding-inline-end: 2.25rem;

      &::after {
        content: '\2713';
        position: absolute;
        inset-block: 0;
        inset-inline-end: 0.75rem;
        display: grid;
        place-content: center;
        font-weight: 600;
      }
    }
  }
}
</style>
