<script setup lang="ts">
import {
  IconArticleFilled,
  IconBell,
  IconHomeFilled,
  IconLogout,
  IconSettingsFilled,
  IconUser,
  IconUsers,
} from '@tabler/icons-vue'
import { Notifications } from '@/plugins/notification'
import { logoutUser } from '@/services/authentication'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const showSidebar = ref(false)

const titleMap: Record<string, string> = {
  dashboard: t('dashboard'),
  articles: t('articles'),
  members: t('members'),
  settings: t('settings'),
}
const title = computed(() => titleMap[route.name as string])

const navGroups = [
  {
    navs: [{ to: '/dashboard', label: titleMap.dashboard, icon: IconHomeFilled }],
  },
  {
    name: 'Clinic',
    navs: [
      { to: '/articles', label: titleMap.articles, icon: IconArticleFilled },
      { to: '/settings', label: titleMap.settings, icon: IconSettingsFilled },
    ],
  },
  {
    name: 'Users',
    navs: [{ to: '/members', label: t('members'), icon: IconUsers }],
  },
]

const options: Record<string, { label: string, icon: Component }> = {
  profile: { label: t('profile'), icon: IconUser },
  logout: { label: t('logout'), icon: IconLogout },
}
const selected = ref('profile')

function onSelected(key: string) {
  if (key === 'logout') {
    logoutUser().then(() => {
      router.push('/login')
    })
  }
}
</script>

<template>
  <div class="home">
    <AppSidebar v-model:active="showSidebar" :nav-groups>
      <template #header>
        PSP
      </template>
    </AppSidebar>

    <AppHeader v-model:show-sidebar="showSidebar" :title class="border-b">
      <template #trailing>
        <section class="flex gap-2">
          <!-- <div class="hidden sm:block">
            <SearchInput class="rounded-full w-60" placeholder="Search..." />
          </div> -->

          <Popover>
            <Button plain class="rounded-full">
              <IconBell />
            </Button>
            <template #popper>
              <div class="max-w-md p-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, praesentium corporis! Ea quis
                reiciendis obcaecati!
              </div>
            </template>
          </Popover>

          <Dropdown v-model:value="selected" :options @select="({ key }) => onSelected(key as string)">
            <Button plain class="rounded-full">
              <IconUser />
            </Button>
            <template #option="{ option }">
              <component :is="option.icon" stroke="1.5" class="inline shrink-0" />
              {{ option.label }}
            </template>
          </Dropdown>
        </section>
      </template>
    </AppHeader>

    <RouterView class="main" />

    <Notifications />
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "dashboard": "Dashboard",
    "articles": "Articles",
    "members": "Members",
    "settings": "Settings",
    "profile": "Profile",
    "logout": "Logout"
  }
}
</i18n>

<style>
:root {
  --app-sidebar-width: 20rem;
  --app-header-height: 3.5rem;
}

@layer components {
  .home {
    @media (min-width: 1024px) {
      margin-inline-start: var(--app-sidebar-width);
    }
  }

  .main {
    min-height: calc(100vh - var(--app-header-height));
    padding: 1.25rem;
  }
}
</style>
