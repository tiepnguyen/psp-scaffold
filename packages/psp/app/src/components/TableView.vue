<script setup lang="ts" generic="T extends string[] | Record<string, unknown>, K extends string | Record<string, unknown>">
const props = defineProps<{
  data?: T[]
  headers?: K[] | Record<string, K>
  sortable?: boolean | string[]
  rowKey?: string
}>()

const sort = defineModel<string | Array<string | boolean>>('sort')

const headers = computed(() => props.headers as Record<string, K>)

function keyForRow(row: T, index: number) {
  return typeof row === 'object'
    ? String(row[(props.rowKey ?? 'id') as keyof T])
    : index
}

function isSortable(key: string) {
  if (Array.isArray(props.sortable)) {
    return props.sortable.includes(key)
  }
  return props.sortable
}

function sortClass(key: string) {
  if (typeof sort.value === 'string') {
    return sort.value === key ? 'sort-asc' : ''
  }

  return sort.value?.[0] === key && (sort.value?.[1] ? 'sort-desc' : 'sort-asc')
}

function handleSortAction(key: string) {
  if (!isSortable(key)) {
    return
  }
  if (typeof sort.value === 'string') {
    sort.value = key
    return
  }

  sort.value = [key, !sort.value?.[1]]
}
</script>

<template>
  <table class="table-view">
    <thead v-if="headers">
      <tr>
        <th
          v-for="(header, key) in headers"
          :key="key"
          :class="[{ sortable: isSortable(key) }, sortClass(key)]"
          @click="handleSortAction(key)"
        >
          <slot name="header" v-bind="{ header, key }">
            {{ header }}
          </slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="keyForRow(row, index)">
        <slot name="row" v-bind="{ row, index }">
          <td v-for="(cell, key) in row" :key>
            <slot name="cell" v-bind="{ cell, key, row: index }">
              {{ cell }}
            </slot>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<style>
@layer components {
  .table-view {
    --border-radius: 0.5rem;

    width: 100%;

    td,
    th {
      padding: 0.75rem 1rem;

      &:first-child {
        border-radius: var(--border-radius) 0 0 var(--border-radius);
      }

      &:last-child {
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
      }
    }

    th {
      position: relative;
      font-weight: normal;
      text-align: start;
      background: #f9f9f9;

      &.sortable::after {
        content: '';
        position: absolute;
        top: 50%;
        inset-inline-end: 1rem;
        translate: 0 -50%;
        width: 1rem;
        height: 1rem;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>')
          center / 1.25rem;
        opacity: 0.25;
      }

      &.sort-asc,
      &.sort-desc {
        font-weight: 600;

        &::after {
          opacity: 1;
        }
      }

      &.sort-asc::after {
        scale: -1;
      }
    }

    tbody tr {
      &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
      }
    }
  }
}
</style>
