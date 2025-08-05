import { firebaseApp } from '../firebase'

export default {
  Mutation: {
    login: async (_parent: unknown, _args: unknown, { token }: Context) => {
      try {
        const user = await firebaseApp.auth().verifyIdToken(token!)
        console.log('User verified:', user)

        const emailList = ['tiep@tiep.info']
        if (!emailList.includes(user.email!)) {
          throw new Error('Unauthorized email')
        }

        console.log(`Setting user role for UID: ${user.uid}`)
        await firebaseApp.auth().setCustomUserClaims(user.uid, {
          role: 'ADMIN',
        })

        console.log('User role set to ADMIN')

        return {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          createdDate: new Date(),
        }
      } catch (error) {
        console.error('Error setting custom user claims:', error)
        throw new Error('Failed to set user role')
      }
    },

    verifyEmailOtp: async (_parent: unknown, { email, otp }: { email: string; otp: string }) => {
      console.log(`Verifying email OTP: ${otp} for email: ${email}`)

      const userId = Math.random().toString(36).substring(2, 15)
      console.log(`Simulated user ID: ${userId}`)
      const token = await firebaseApp.auth().createCustomToken(email, {
        uid: email,
        email,
        role: 'USER',
      })

      return {
        token,
      }
    },
  },
}
