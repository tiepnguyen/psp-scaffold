<script setup lang="ts">
const { length = 6 } = defineProps<{
  length?: number
}>()

const model = defineModel('value', { default: '' })

function handleInputValue(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.value.length) {
    const nextSibling = input.nextElementSibling as HTMLInputElement
    nextSibling?.focus()
  } else {
    const previousSibling = input.previousElementSibling as HTMLInputElement
    previousSibling?.focus()
  }

  model.value = Array.from(document.querySelectorAll<HTMLInputElement>('.otp-input input'))
    .map(input => input.value)
    .join('')
}

function handlePasteValue(event: ClipboardEvent) {
  const clipboardData = event.clipboardData
  if (!clipboardData) {
    return
  }

  const pastedData = clipboardData.getData('text')
  const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input input')

  inputs.forEach((input, index) => {
    if (pastedData[index]) {
      input.value = pastedData[index]
      input.dispatchEvent(new Event('input'))
    }
  })
}
</script>

<template>
  <div class="otp-input">
    <template v-for="_i in length" :key="_i">
      <input
        type="text"
        name="otp"
        class="form-input"
        autocomplete="one-time-code"
        maxlength="1"
        @input="handleInputValue"
        @paste="handlePasteValue"
      >
    </template>
  </div>
</template>

<style>
.otp-input {
  display: flex;
  gap: 0.75rem;

  input {
    appearance: textfield;
    width: 2.75rem;
    font-size: 1.25rem;
    text-align: center;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
}
</style>
