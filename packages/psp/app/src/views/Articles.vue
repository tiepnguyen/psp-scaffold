<script setup lang="ts">
import { IconDotsVertical, IconFilter, IconPlus } from '@tabler/icons-vue'
import { formatDate } from '@/services/datetime'
import { formatNumber } from '@/services/number'

const { t } = useI18n()

const headers = {
  title: t('title'),
  author: t('author'),
  date: t('date'),
  category: t('category'),
  views: t('views'),
  status: t('status'),
  action: '',
}

type ArticleStatus = 'PUBLISHED' | 'DRAFT' | 'SCHEDULED' | 'PAUSED' | 'DELETED'
interface Article {
  title: string
  author: string
  date: string
  category: string
  views: number
  status: ArticleStatus
}

const sortable = Object.entries(headers).filter(([_, value]) => Boolean(value)).map(([key]) => key)
const sort = ref(['date', true])

const status: Record<ArticleStatus, string> = {
  DRAFT: t('draft'),
  PUBLISHED: t('published'),
  SCHEDULED: t('scheduled'),
  PAUSED: t('paused'),
  DELETED: t('deleted'),
}

const statusChip: Record<ArticleStatus, string> = {
  DRAFT: 'chip-neutral',
  PUBLISHED: 'chip-info',
  SCHEDULED: 'chip-success',
  PAUSED: 'chip-warning',
  DELETED: 'chip-error',
}

const data: Article[] = [
  {
    title: 'Article 1',
    author: 'John Doe',
    date: '2022-01-01',
    category: 'Technology',
    views: 1500,
    status: 'SCHEDULED',
  },
  {
    title: 'Article 2',
    author: 'Jane Doe',
    date: '2022-01-02',
    category: 'Business',
    views: 2450,
    status: 'DRAFT',
  },
  {
    title: 'Article 3',
    author: 'John Smith',
    date: '2022-01-03',
    category: 'Sports',
    views: 2560,
    status: 'PUBLISHED',
  },
  {
    title: 'Article 4',
    author: 'John Smith',
    date: '2022-01-03',
    category: 'Sports',
    views: 2560,
    status: 'PAUSED',
  },
  {
    title: 'Article 5',
    author: 'John Smith',
    date: '2022-01-03',
    category: 'Sports',
    views: 2560,
    status: 'DELETED',
  },
]

const tableData = computed(() => data
  .map(article => ({
    ...article,
    date: formatDate(article.date, 'medium'),
    views: formatNumber(article.views, { style: 'decimal' }),
  })),
)
</script>

<template>
  <div class="grid grid-rows-panel gap-6">
    <div class="toolbar">
      <section>
        <Button class="font-medium pe-3">
          <IconPlus />
          {{ $t('add_article') }}
        </Button>
      </section>

      <section>
        <Button plain>
          <IconFilter />
        </Button>
      </section>

      <section>
        <SearchInput class="rounded-full bg-gray-50" :placeholder="$t('search...')" />
      </section>
    </div>

    <div class="overflow-x-auto">
      <TableView v-model:sort="sort" :headers :data="tableData" :sortable>
        <template #header="{ header }">
          {{ header }}
        </template>
        <template #row="{ row }">
          <td>{{ row.title }}</td>
          <td>{{ row.author }}</td>
          <td>{{ row.date }}</td>
          <td>{{ row.category }}</td>
          <td>{{ row.views }}</td>
          <td>
            <span class="chip" :class="statusChip[row.status]">
              {{ status[row.status] }}
            </span>
          </td>
          <td class="text-end pe-0">
            <Button plain class="size-9.5">
              <IconDotsVertical />
            </Button>
          </td>
        </template>
      </TableView>
    </div>
  </div>
</template>

<style></style>
