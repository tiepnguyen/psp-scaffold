import { type DecodedIdToken } from 'firebase-admin/auth'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express5'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadFiles } from '@graphql-tools/load-files'
import { useServer } from 'graphql-ws/use/ws'
import { WebSocketServer } from 'ws'
import express from 'express'
import http from 'http'
import { verifyToken } from './services/authentication'

const isProduction = process.env.NODE_ENV === 'production'
const introspection = !isProduction
const includeStacktraceInErrorResponses = !isProduction
const port = 4000
const path = '/graphql'

const app = express()
const httpServer = http.createServer(app)
const schema = makeExecutableSchema({
  typeDefs: await loadFiles('./typeDefs/*.gql'),
  resolvers: await loadFiles('./resolvers/*.ts'),
})

const wsServer = new WebSocketServer({ server: httpServer, path })
const serverCleanup = useServer({ schema }, wsServer)
const server = new ApolloServer<Context>({
  schema,
  introspection,
  includeStacktraceInErrorResponses,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      serverWillStart: async () => ({
        drainServer: async () => {
          await serverCleanup.dispose()
        },
      }),
    },
  ],
})

await server.start()

app.use(
  path,
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      let token: string | undefined
      let tokenResult: DecodedIdToken | undefined
      const query: string = req?.body?.query?.trim()

      if (!query.startsWith('mutation VerifyEmailOtp')) {
        token = req?.headers?.authorization
        tokenResult = await verifyToken(token)
      }

      return { token, tokenResult }
    },
  })
)

httpServer.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${path}`)
})
