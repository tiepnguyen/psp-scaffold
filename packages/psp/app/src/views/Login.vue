<script setup lang="ts">
const { t } = useI18n()
const OTPForm = defineAsyncComponent(() => import('@/components/OTPForm.vue'))
const showOtpScreen = ref(false)
const otpEmail = ref('')

function otpEmailSignin(email: string) {
  otpEmail.value = email
  toggleOtpScreen()
}

function toggleOtpScreen() {
  showOtpScreen.value = !showOtpScreen.value
}
</script>

<template>
  <div class="auth-view">
    <div class="auth-panel">
      <div class="max-w-md m-auto p-6 grid gap-6">
        <h1 class="text-center text-4xl font-extralight uppercase">
          PSP
        </h1>

        <div class="p-6 space-y-6 border rounded-xl">
          <h1 class="text-xl font-light">
            {{ t('sign_in') }}
          </h1>

          <LoginForm v-show="!showOtpScreen" key="signin-form" @email-sign-in="otpEmailSignin" />
          <OTPForm v-show="showOtpScreen" key="otp-form" :email="otpEmail" @back-to-sign-in="toggleOtpScreen" />
        </div>
      </div>
    </div>

    <div class="auth-cover">
      <!--  -->
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "sign_in": "Sign In"
  }
}
</i18n>

<style>
.auth-view {
  display: grid;
  height: 100vh;

  @media (min-width: 64rem) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.auth-panel {
  align-self: center;
}

.auth-cover {
  position: relative;
  background: #eee;
  display: none;

  @media (min-width: 64rem) {
    display: block;
  }
}
</style>
