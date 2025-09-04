<script setup lang="ts">
import { IconDotsVertical, IconEdit, IconFilter, IconPlus, IconTrash } from '@tabler/icons-vue'
import { showDialog } from '@/plugins/dialog'

type RoleStatus = 'MEMBER' | 'MODERATOR' | 'ADMIN'
interface ItemOptions { label: string, icon: Component, style?: string }
interface Member {
  id: string
  name: string
  image: string
  date: string
  title: string
  views: number
  role: RoleStatus
}

const { t } = useI18n()

const data: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    image: '/images/avatar-1.png',
    date: '2022-01-01',
    title: 'Technology',
    views: 1500,
    role: 'MEMBER',
  },
  {
    id: '2',
    name: 'Jane Doe',
    image: '/images/avatar-2.png',
    date: '2022-01-02',
    title: 'Business',
    views: 2450,
    role: 'MEMBER',
  },
  {
    id: '3',
    name: 'John Smith',
    image: '/images/avatar-3.png',
    date: '2022-01-03',
    title: 'Sports',
    views: 2560,
    role: 'MEMBER',
  },
  {
    id: '4',
    name: 'John Smith',
    image: '/images/avatar-4.png',
    date: '2022-01-03',
    title: 'Sports',
    views: 2560,
    role: 'MODERATOR',
  },
  {
    id: '5',
    name: 'John Smith',
    image: '/images/avatar-5.png',
    date: '2022-01-03',
    title: 'Sports',
    views: 2560,
    role: 'ADMIN',
  },
]

const rowOptions: Record<string, ItemOptions> = {
  edit: { label: t('edit'), icon: IconEdit },
  delete: { label: t('delete'), icon: IconTrash, style: 'text-danger' },
}

function onSelectOption(key: string) {
  if (key === 'delete') {
    showDialog({
      title: 'Are you sure?',
      message: 'This will delete the member',
      stacked: true,
      buttons: [
        { label: 'Cancel' },
        { label: 'Delete', style: 'destructive' },
      ],
    })
  }
}
</script>

<template>
  <div class="grid grid-rows-panel gap-6">
    <div class="toolbar">
      <section>
        <Button class="font-medium pe-3">
          <IconPlus />
          {{ $t('add_member') }}
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

    <ListView v-slot="{ item }" :data="data" class="space-y-4">
      <TileView :title="item.name" :detail="item.title">
        <template #image>
          <img :src="item.image" alt="" class="size-12 rounded-xl">
        </template>
        <template #action>
          <Dropdown :options="rowOptions" @select="({ key }) => onSelectOption(key as string)">
            <Button plain>
              <IconDotsVertical />
            </Button>
            <template #option="{ option }">
              <div class="flex items-center gap-4" :class="option.style">
                <component :is="option.icon" stroke="1.5" />
                {{ option.label }}
              </div>
            </template>
          </Dropdown>
        </template>
      </TileView>
    </ListView>
  </div>
</template>
