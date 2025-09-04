import { TransitionGroup } from 'vue'
import './notification.css'

interface NotificationOptions {
  id: string
  title: string
  message: string
  autoClose?: boolean
}

const notifications = ref<NotificationOptions[]>([])

const Notification = defineComponent<NotificationOptions>(
  (props) => {
    return () =>
      h('div', { class: 'notification' }, [
        h('div', { class: 'notification-title' }, props.title),
        h('div', { class: 'notification-message' }, props.message),
        h(
          'button',
          {
            class: 'notification-close',
            onClick: () => {
              notifications.value = notifications.value.filter(n => n.id !== props.id)
            },
          },
          'Close',
        ),
      ])
  },
  { props: ['id', 'title', 'message', 'autoClose'] },
)

export const Notifications = defineComponent(() => {
  return () =>
    h(TransitionGroup, { tag: 'div', name: 'notifications', class: 'notifications' }, () =>
      notifications.value.map(n => h(Notification, { key: n.id, ...n })))
})

export function showNotification(options: Omit<NotificationOptions, 'id'>) {
  const id = Math.random().toString(36).substring(2, 15)
  const notification = { id, ...options }
  notifications.value.push(notification)

  if (options.autoClose) {
    setTimeout(() => {
      notifications.value = notifications.value.filter(n => n.id !== id)
    }, 3000)
  }

  return notification
}
