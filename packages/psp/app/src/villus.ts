import type { ClientPlugin, ClientPluginContext, ClientPluginOperation, OperationResult } from 'villus'
import { clear, delMany, entries, get, set } from 'idb-keyval'
import { createClient, defaultPlugins, definePlugin } from 'villus'
import { auth } from '@/services/authentication'

interface ResultCacheItem {
  result: OperationResult
  tags?: string[]
}

function arrayToExistHash<T extends string | number>(items: T[]) {
  return items.reduce((acc, item) => {
    acc[String(item)] = true
    return acc
  }, {} as Record<string, boolean>)
}

function persistentCache(): ClientPlugin {
  async function setCacheResult({ key, tags }: ClientPluginOperation & { type: 'query' }, result: OperationResult) {
    await set(key, { result, tags })
  }

  async function getCachedResult({ key }: ClientPluginOperation): Promise<OperationResult | undefined> {
    const cacheItem: ResultCacheItem | undefined = await get(key)
    return cacheItem?.result
  }

  async function clearCache(tags?: string | string[]) {
    if (!tags) {
      await clear()
      return
    }
    const tagArray = Array.isArray(tags) ? tags : [tags]
    if (!tagArray.length) {
      return
    }
    const tagsLookup = arrayToExistHash(tagArray)
    const allEntries = await entries()
    const keysToRemove = allEntries
      .filter(([_, item]) => item?.tags?.some((t: string) => tagsLookup[t]))
      .map(([key]) => key)
    await delMany(keysToRemove)
  }

  async function cachePlugin({ afterQuery, useResult, operation }: ClientPluginContext) {
    if (operation.type === 'mutation' && operation.clearCacheTags?.length) {
      afterQuery(async (result) => {
        if (result.data) {
          await clearCache(operation.clearCacheTags)
        }
      })
      return
    }

    if (operation.type !== 'query' || operation.cachePolicy === 'network-only') {
      return
    }

    afterQuery(async (result) => {
      await setCacheResult(operation, result)
    })

    const cachedResult = await getCachedResult(operation)
    if (cachedResult) {
      return useResult(cachedResult, operation.cachePolicy === 'cache-first')
    }
  }

  return cachePlugin
}

function authPlugin() {
  return definePlugin(async ({ opContext }) => {
    const token = await auth.currentUser?.getIdToken()
    opContext.headers.Authorization = `${token}`
  })
}

export const client = createClient({
  url: '/graphql',
  use: [authPlugin(), persistentCache(), ...defaultPlugins()],
})
