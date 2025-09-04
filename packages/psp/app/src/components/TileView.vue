<script setup lang="ts">
defineProps<{
  title: string
  caption?: string
  detail?: string
  image?: string
  imageWidth?: number | `${number}`
  imageHeight?: number | `${number}`
  imageSize?: number | `${number}`
}>()
</script>

<template>
  <div class="tile-view">
    <div v-if="image ?? $slots.image" class="tile-image">
      <slot name="image">
        <img :src="image" :width="imageWidth ?? imageSize" :height="imageHeight ?? imageSize" alt="">
      </slot>
    </div>
    <div class="tile-content">
      <slot name="default">
        <div class="tile-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div class="tile-caption">
          <slot name="caption">
            {{ caption }}
          </slot>
        </div>
        <div class="tile-detail">
          <slot name="detail">
            {{ detail }}
          </slot>
        </div>
      </slot>
    </div>
    <div v-if="$slots.action" class="tile-action">
      <slot name="action" />
    </div>
  </div>
</template>

<style>
@layer components {
  .tile-view {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .tile-image,
  .tile-action {
    flex-shrink: 0;
  }

  .tile-content {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }

  .tile-title {
    font-weight: 500;
    flex: 1;
  }

  .tile-detail {
    flex-basis: 100%;
  }
}
</style>
