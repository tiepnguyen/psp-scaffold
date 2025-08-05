<script setup lang="ts">
interface NavItem {
  to: string
  label: string
  icon: any
}

interface NavGroup {
  name?: string
  navs: NavItem[]
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  navs?: NavItem[]
  navGroups?: NavGroup[]
}>()

const active = defineModel('active', { default: false })
const navGroups = computed(() => props.navGroups || ([{ navs: props.navs }] as NavGroup[]))

function close() {
  active.value = false
}
</script>

<template>
  <div class="app-sidebar" :class="{ active }" v-bind="$attrs">
    <template v-if="$slots.header">
      <div class="sidebar-header">
        <slot name="header" />
      </div>
    </template>

    <nav class="sidebar-nav">
      <slot name="default">
        <ul v-for="navGroup in navGroups" :key="navGroup.name" :data-name="navGroup.name" :aria-label="navGroup.name">
          <li v-for="{ to, label, icon } in navGroup.navs" :key="to" @click="close">
            <RouterLink :to="to" active-class="active">
              <component :is="icon" />
              {{ label }}
            </RouterLink>
          </li>
        </ul>
      </slot>
    </nav>

    <template v-if="$slots.footer">
      <div class="sidebar-footer">
        <slot name="footer" />
      </div>
    </template>
  </div>

  <div class="sidebar-backdrop" @click="close" />
</template>

<style>
@layer components {
  .app-sidebar {
    --x-direction: -1;

    position: fixed;
    inset: 0;
    width: var(--app-sidebar-width, 20rem);
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f1f5f9;
    translate: calc(var(--x-direction) * 100%);
    transition: translate var(--transition-duration-medium);
    will-change: translate;
    z-index: 3;

    &:dir(rtl) {
      --x-direction: 1;
    }

    &.active {
      translate: 0;
    }

    @media (min-width: 1024px) {
      translate: 0;
    }
  }

  .sidebar-header {
    display: grid;
    place-items: center;
    min-height: var(--app-header-height);
    font-size: 1.75rem;
    font-weight: 200;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    flex: 1;
    overflow-y: auto;
    padding: 1rem;

    ul {
      display: grid;
      gap: 0.25rem;

      &[data-name]::before {
        content: attr(data-name);
        font-size: 0.875rem;
        font-weight: 500;
        color: #666;
        margin-bottom: 0.5rem;
      }
    }

    a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      transition: background-color var(--transition-duration-fast);

      &:hover {
        background: #fff8;
      }

      &.active {
        background: #fff;
        /* background: color-mix(in srgb, var(--color-primary), transparent 90%); */
        color: var(--color-primary);
        font-weight: 500;

        svg {
          opacity: 1;
        }
      }

      svg {
        opacity: 0.5;
      }
    }
  }

  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgb(20 20 43 / 70%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s, visibility 0.25s;
    will-change: opacity, visibility;
    z-index: 2;

    .app-sidebar.active + & {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
