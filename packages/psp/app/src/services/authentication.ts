import type { User } from 'firebase/auth'
import { getAuth, GoogleAuthProvider, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithCustomToken, signInWithPopup } from 'firebase/auth'
import { useMutation } from 'villus'
import { firebaseApp } from '@/firebase'

export const auth = getAuth(firebaseApp)

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(resolve)
  })
}

export async function getUserClaims(force = false) {
  const user = await getCurrentUser()
  if (!user) {
    return null
  }

  const { claims } = await user.getIdTokenResult(force)
  return claims
}

export async function getUserRole(force = false) {
  const claims = await getUserClaims(force)
  return claims?.role
}

export function googlePopupSignIn() {
  return signInWithPopup(auth, new GoogleAuthProvider())
}

export function emailLinkSignIn(email: string) {
  localStorage.setItem('emailForSignIn', email)
  return sendSignInLinkToEmail(auth, email, {
    url: `${window.location.origin}/verify`,
    handleCodeInApp: true,
  })
}

export function isEmailLinkSignin() {
  return isSignInWithEmailLink(auth, window.location.href)
}

export function logoutUser() {
  return auth.signOut()
}

export function loginUser() {
  const query = `
    mutation Login {
      login {
        id
        name
        email
        createdDate
      }
    }
  `
  const { execute } = useMutation(query)
  return execute()
}

export function verifyEmailOtp(email: string, otp: string) {
  const query = `
    mutation VerifyEmailOtp($email: String!, $otp: String!) {
      verifyEmailOtp(email: $email, otp: $otp) {
        token
      }
    }
  `
  const { execute } = useMutation<{ verifyEmailOtp: { token: string } }>(query)
  return execute({ email, otp })
}

export function signInWithToken(token: string) {
  return signInWithCustomToken(auth, token)
}
