<script setup lang="ts">
import { IconArrowRight } from '@tabler/icons-vue'
import { getUserRole, googlePopupSignIn, loginUser } from '@/services/authentication'
import GoogleIcon from '../assets/icons/google.svg?component'

const emit = defineEmits<{
  emailSignIn: [email: string]
}>()

const { t } = useI18n()
const router = useRouter()
const email = ref('')
const isValidEmail = ref(true)
const signingGoogle = ref(false)

async function googleSignin() {
  await googlePopupSignIn()

  const role = await getUserRole()

  if (role) {
    router.push({ name: 'home' })
    return
  }

  try {
    signingGoogle.value = true
    await loginUser()
    await getUserRole(true)
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    signingGoogle.value = false
  }
}

function validateEmail() {
  const emailRegex = /^[\w.+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
  isValidEmail.value = emailRegex.test(email.value)
}

function emailSignIn() {
  validateEmail()
  if (!isValidEmail.value) {
    return
  }

  emit('emailSignIn', email.value)
}
</script>

<template>
  <form class="space-y-6" novalidate @submit.prevent="emailSignIn">
    <Button class="w-full h-11" :class="{ loading: signingGoogle }" @click="googleSignin">
      <GoogleIcon class="size-5" />
      {{ t('sign_in_with_google') }}
    </Button>

    <div class="divider">
      {{ t('or') }}
    </div>

    <div class="form-control">
      <div class="form-label">
        {{ t('email') }}
      </div>

      <input
        v-model.trim="email" type="email" name="email" autocomplete="email" class="form-input"
        :class="{ invalid: !isValidEmail }" @blur="validateEmail"
      >

      <div v-show="!isValidEmail" class="input-hint">
        {{ t('invalid_email') }}
      </div>
    </div>

    <Button submit primary class="w-full h-11">
      {{ t('sign_in') }}
      <IconArrowRight size="20" />
    </Button>
  </form>
</template>

<i18n lang="json">
{
  "en-US": {
    "sign_in_with_google": "Sign in with Google",
    "or": "or",
    "email": "Email",
    "invalid_email": "Invalid email address",
    "sign_in": "Sign In"
  }
}
</i18n>
