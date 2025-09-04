import './dialog.css'

interface DialogButton {
  label: string
  style?: 'primary' | 'destructive'
  onClick?: () => void
}

interface DialogOptions {
  title: string
  message?: string
  image?: string
  stacked?: boolean
  buttons?: DialogButton[]
}

function createDialogElement(options: DialogOptions) {
  const dialog = document.createElement('dialog')
  dialog.className = 'dialog'
  if (options.stacked) {
    dialog.classList.add('stacked')
  }

  const closeDialog = () => {
    dialog.removeEventListener('close', closeDialog)
    dialog.close()
    dialog.remove()
  }

  const dialogHeader = document.createElement('div')
  dialogHeader.className = 'dialog-title'
  dialogHeader.textContent = options.title

  const dialogBody = document.createElement('div')
  dialogBody.className = 'dialog-body'
  dialogBody.textContent = options.message ?? ''

  dialog.appendChild(dialogHeader)
  dialog.appendChild(dialogBody)

  if (options.buttons?.length) {
    const dialogButtons = options.buttons?.map((item) => {
      const button = document.createElement('button')
      button.textContent = item.label
      button.onclick = item.onClick ?? closeDialog
      if (item.style) {
        button.classList.add(DialogButtonStyle[item.style])
      }

      return button
    })

    const dialogFooter = document.createElement('div')
    dialogFooter.className = 'dialog-footer'
    dialogFooter.append(...dialogButtons)
    dialog.appendChild(dialogFooter)
  }

  dialog.addEventListener('close', closeDialog)

  document.body.appendChild(dialog)

  return dialog
}

export function showDialog(title: string | DialogOptions = '', message?: string) {
  const options: DialogOptions = typeof title === 'string' ? { title, message } : title

  console.log(`Dialog shown with title: ${options.title}, message: ${options.message}`)

  const dialog = createDialogElement({
    title: options.title,
    message: options.message,
    image: options.image,
    stacked: options.stacked,
    buttons: options.buttons ?? [{ label: 'OK', style: 'primary' }],
  })
  dialog.showModal()
}
