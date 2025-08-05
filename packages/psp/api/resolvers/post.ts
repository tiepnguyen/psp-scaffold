import { PubSub } from 'graphql-subscriptions'
import type { CreatePostInput } from '@psp/types'
import { getPosts, getPostById } from '../services/post'


let pubsub = new PubSub()


const SubscriptionTopic = {
  PostCreated: 'POST_CREATED',
} as const

export const resolvers = {
  Query: {
    async posts() {
      return await getPosts()
    },

    async post(_: any, { id }: { id: string }) {
      return await getPostById(id)
    },
  },

  Mutation: {
    async createPost(_: any, { data }: { data: CreatePostInput }) {
      const newPost = {
        id: Math.random().toString(36).substring(2, 15),
        title: data.title,
        status: data.status || 'DRAFT',
        createdDate: new Date().toISOString(),
      }

      pubsub.publish(SubscriptionTopic.PostCreated, { postCreated: newPost })

      return newPost
    },
  },

  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterableIterator(SubscriptionTopic.PostCreated),
    },
  },
}
