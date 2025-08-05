import { GraphQLError } from 'graphql'
import { firebaseApp } from '../firebase'

export async function verifyToken(token?: string) {
  console.log(`Verifying token: ${token}`)

  if (!token) {
    throw new GraphQLError('Authorization token is required')
  }

  try {
    const result = await firebaseApp.auth().verifyIdToken(token)
    console.log('Token is valid', result)
    return result
  } catch (error: any) {
    console.error(`Error verifying token: ${error.message}`)
    throw new GraphQLError('Invalid or expired token')
  }
}
