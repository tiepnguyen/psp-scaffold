<script setup lang="ts">
import {
  IconArticleFilled,
  IconBell,
  IconHomeFilled,
  IconLogout,
  IconSettingsFilled,
  IconUser,
} from '@tabler/icons-vue'
import { logoutUser } from '@/services/authentication'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const showSidebar = ref(false)

const titleMap: Record<string, string> = {
  dashboard: t('dashboard'),
  articles: t('articles'),
  settings: t('settings'),
}
const title = computed(() => titleMap[route.name as string])

const navGroups = [
  {
    navs: [{ to: '/dashboard', label: t('dashboard'), icon: IconHomeFilled }],
  },
  {
    name: 'Clinic',
    navs: [
      { to: '/articles', label: t('articles'), icon: IconArticleFilled },
      { to: '/settings', label: t('settings'), icon: IconSettingsFilled },
    ],
  },
]

const options: Record<string, { label: string, icon: Component }> = {
  profile: { label: t('profile'), icon: IconUser },
  logout: { label: t('logout'), icon: IconLogout },
}
const selected = ref('profile')

function onSelected(_: unknown, key: string | number) {
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

          <Dropdown v-model:value="selected" :options @select="onSelected">
            <Button plain class="rounded-full">
              <IconUser />
            </Button>
            <template #option="{ option }">
              <component :is="option.icon" size="20" class="inline shrink-0" />
              {{ option.label }}
            </template>
          </Dropdown>
        </section>
      </template>
    </AppHeader>

    <RouterView class="main" />
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "dashboard": "Dashboard",
    "articles": "Articles",
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
    padding: 1.5rem;
  }
}
</style>
