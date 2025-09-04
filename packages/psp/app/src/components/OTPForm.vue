<script setup lang="ts">
import { IconArrowLeft } from '@tabler/icons-vue'
import { router } from '@/router'
import { signInWithToken, verifyEmailOtp } from '@/services/authentication'

const { email } = defineProps<{
  email: string
}>()

const emit = defineEmits<{
  backToSignIn: []
}>()

const { t } = useI18n()
const otp = ref('')
const isValidOtp = ref(true)
const verifyingOtp = ref(false)

function validateOtp() {
  const otpRegex = /^\d{6}$/
  isValidOtp.value = otpRegex.test(otp.value)
}

async function verifyOtp() {
  validateOtp()
  if (!isValidOtp.value) {
    return
  }

  verifyingOtp.value = true

  const { data } = await verifyEmailOtp(email, otp.value)
  await signInWithToken(data!.verifyEmailOtp.token)
  router.push({ name: 'home' })
}

watch(otp, () => {
  if (otp.value.length === 6) {
    verifyOtp()
  }
})
</script>

<template>
  <form class="space-y-6" @submit.prevent="verifyOtp">
    <div class="form-control">
      <div class="form-label flex justify-between">
        OTP
        <button type="button" class="flex-center gap-1">
          {{ t('resend_otp') }}
        </button>
      </div>

      <OTPInput v-model:value="otp" />
      <div v-show="!isValidOtp" class="input-hint">
        {{ t('invalid_otp') }}
      </div>
    </div>
    <Button submit primary class="w-full h-11" :class="{ loading: verifyingOtp }">
      {{ t('verify_otp') }}
    </Button>

    <button type="button" class="flex-center gap-2" @click="emit('backToSignIn')">
      <IconArrowLeft size="20" />
      {{ t('back_to_sign_in') }}
    </button>
  </form>
</template>

<i18n lang="json">
{
  "en-US": {
    "verify_otp": "Verify OTP",
    "resend_otp": "Resend OTP",
    "invalid_otp": "Invalid OTP",
    "back_to_sign_in": "Back to Sign In"
  }
}
</i18n>
