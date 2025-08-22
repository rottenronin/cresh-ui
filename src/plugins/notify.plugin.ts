import type { App } from 'vue'
import type { NotifyOptions } from '../@types'

import {
  pubSubHelper,
  uuidv4,
} from '../helpers'

// eslint-disable-next-line prefer-const
let notifs: {
  id: string
  message: string
  options: NotifyOptions
  }[] = []

const removeNotification = ({
  id,
  message,
  options,
}: {
  id: string
  message: string
  options: NotifyOptions
}) => {
  const i = notifs.findIndex(n => n.id === id)

  if (i > -1) {
    notifs.splice(i, 1)
  }
  let notifiesContainer: HTMLDivElement | null
  const notifiesContainers = document.body.querySelectorAll(
    `.c-notifies.${options.position}`,
  )

  if (!notifiesContainers || notifiesContainers.length === 0) {
    notifiesContainer = document.createElement('div')
    notifiesContainer.classList.add('c-notifies', options.position)
    document.body.appendChild(notifiesContainer)
  } else {
    notifiesContainer = notifiesContainers.item(0) as HTMLDivElement
  }
  const element = notifiesContainer?.querySelector(`#c${id}`)

  if (element) {
    if (options.closable) {
      const closeBtn = element.querySelector('.close-btn')
      if (closeBtn) {
        closeBtn.removeEventListener('click', () => {
          removeNotification({
            id,
            message,
            options,
          })
        })
      }
    }
    notifiesContainer?.removeChild(element)

    const { callback } = options

    if (callback) {
      const messageDiv = element.querySelector('.message')

      messageDiv?.removeEventListener('click', event => {
        callback(event)
      })
    }
  }
}

const displayNotification = ({
  id,
  message,
  options,
}: {
  id: string
  message: string
  options: NotifyOptions
}) => {
  const container = document.createElement('div')
  const messageDiv = document.createElement('p')
  const iconElem = document.createElement('i')
  const textNode = document.createTextNode(message)
  const body = document.createElement('div')

  const notifiesContainers = document.body.querySelectorAll(
    `.c-notifies.${options.position}`,
  )

  let notifiesContainer: HTMLDivElement | null

  if (!notifiesContainers || notifiesContainers.length === 0) {
    notifiesContainer = document.createElement('div')
    notifiesContainer.classList.add('c-notifies', options.position)
    document.body.appendChild(notifiesContainer)
  } else {
    notifiesContainer = notifiesContainers.item(0) as HTMLDivElement
  }

  if (options.closable) {
    const closeBtnDiv = document.createElement('div')
    closeBtnDiv.classList.add('close-btn')
    closeBtnDiv.textContent = '×'
    container.appendChild(closeBtnDiv)

    closeBtnDiv.addEventListener('click', () => {
      removeNotification({
        id,
        message,
        options,
      })
    })
  }

  const { callback } = options

  if (callback) {
    messageDiv.addEventListener('click', event => {
      callback(event)
    })
    container.classList.add('clickable')
  }

  container.id = `c${id}`
  container.classList.add(
    'c-notify',
    options.type,
  )
  if (options.classes) {
    container.classList.add(...options.classes)
  }
  if (callback) {
    container.classList.add('clickable')
  }
  iconElem.classList.add(options.type)
  body.classList.add('c-notify-body')
  notifiesContainer.appendChild(container)
  container.appendChild(body)
  body.appendChild(iconElem)
  body.appendChild(messageDiv)
  messageDiv.classList.add('message')
  messageDiv.appendChild(textNode)
}

// eslint-disable-next-line no-unexpected-multiline
// (() => {

pubSubHelper.subscribe('SEND_NOTIFICATION', ({
  key: 'SEND_NOTIFICATION',
  callback: ({
    id,
    message,
    options,
  }: {
      id: string
      message: string
      options: NotifyOptions
    }) => {
    notifs.push({
      id,
      message,
      options,
    })
    displayNotification({
      id,
      message,
      options,
    })
    if (!options.persistent) {
      setTimeout(() => {
        removeNotification({
          id,
          message,
          options,
        })
      }, options.duration)
    }
  },
}))

pubSubHelper.subscribe('CLEAR_ALL_NOTIFICATION', ({
  key: 'CLEAR_ALL_NOTIFICATION',
  callback: () => {
    const containers = document.body.querySelectorAll('.c-notifies')
    if (containers && containers.length > 0) {
      containers.forEach(element => {
        element.remove()
      })
    }
  },
}))
// })()

export default {
  install (
    app: App,
    options: NotifyOptions = {
      duration: 2000,
      type: 'default',
      position: 'top-right',
      closable: true,
      persistent: false,
      callback: undefined,
      classes: undefined,
    },
  ): void {
    const notify = {
      success: (
        message: string,
        notifyOptions: NotifyOptions = options,
      ): void => {
        pubSubHelper.publish('SEND_NOTIFICATION', {
          id: uuidv4(),
          message,
          options: {
            ...notifyOptions,
            type: 'success',
          },
        })
      },

      error: (
        message: string,
        notifyOptions: NotifyOptions = options,
      ): void => {
        pubSubHelper.publish('SEND_NOTIFICATION', {
          id: uuidv4(),
          message,
          options: {
            ...notifyOptions,
            type: 'error',
          },
        })
      },

      warning: (
        message: string,
        notifyOptions: NotifyOptions = options,
      ): void => {
        pubSubHelper.publish('SEND_NOTIFICATION', {
          id: uuidv4(),
          message,
          options: {
            ...notifyOptions,
            type: 'warning',
          },
        })
      },

      info: (
        message: string,
        notifyOptions: NotifyOptions = options,
      ): void => {
        pubSubHelper.publish('SEND_NOTIFICATION', {
          id: uuidv4(),
          message,
          options: {
            ...notifyOptions,
            type: 'info',
          },
        })
      },

      default: (
        message: string,
        notifyOptions: NotifyOptions = options,
      ): void => {
        pubSubHelper.publish('SEND_NOTIFICATION', {
          id: uuidv4(),
          message,
          options: {
            ...notifyOptions,
            type: 'default',
          },
        })
      },

      send: (
        message: string,
        notifyOptions: NotifyOptions = options,
      ): void => {
        let type = 'default'
        switch (notifyOptions.type) {
          case 'error': {
            type = 'error'
            break
          }
          case 'info': {
            type = 'info'
            break
          }
          case 'success': {
            type = 'success'
            break
          }
          case 'warning': {
            type = 'warning'
            break
          }
          default: {
            type = 'default'
          }
        }
        pubSubHelper.publish('SEND_NOTIFICATION', {
          id: uuidv4(),
          message,
          options: {
            ...notifyOptions,
            type,
          },
        })
      },

      clearAll: (): void => {
        pubSubHelper.publish('CLEAR_ALL_NOTIFICATION')
      },

      destroy: (): void => {
        pubSubHelper.publish('CLEAR_ALL_NOTIFICATION')
        pubSubHelper.clear()
      },
    }

    app.config.globalProperties.$notify = notify

    app.provide('$notify', notify)
  },
}
