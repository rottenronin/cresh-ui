 
import { EventEmitter } from 'events'

const pubSubEvents = [
  'SEND_NOTIFICATION',
  'CLEAR_ALL_NOTIFICATION',
]

type PubSubEvent = typeof pubSubEvents[number]

/**
 * Subscriber signature
 */
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 type PubSubEventSubscriber<T extends PubSubEvent> = {
  key: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (data: any) => void
}

type PubSubEventSubscribers = {
  [K in PubSubEvent]?: PubSubEventSubscriber<K>[]
}

/**
 * Array holder of all active subscribers
 */
const eventsSubscribers: PubSubEventSubscribers = {}

/**
 * get list of subscribers to a specific event
 */
const getEventSubscribers = <T extends PubSubEvent>(
  event: T,
): PubSubEventSubscriber<T>[] => {
  const subscribers = eventsSubscribers[event] || []
  return [...subscribers as NonNullable<PubSubEventSubscriber<T>[]>]
}

/**
 * subscribe to an event
 */
const subscribe = <T extends PubSubEvent>(
  event: T,
  subscriber: PubSubEventSubscriber<T>,
): void => {
  const subscribers = getEventSubscribers(event)

  if (!subscribers.find(s => s.key === subscriber.key)) {
    const subscribersArray = eventsSubscribers[event] || []
    const addSubscriber = [
      ...subscribersArray as NonNullable<PubSubEventSubscriber<T>[]>,
      subscriber,
    ]
    eventsSubscribers[event] = addSubscriber as PubSubEventSubscribers[T]
  }
}

/**
 * unsubscribe from an event by key identifier
 */
const unsubscribe = <T extends PubSubEvent>(
  event: T,
  key: string,
): void => {
  if (eventsSubscribers[event]?.length) {
    const subscribersArray = eventsSubscribers[event] || []
    const removeSubscriber = [
      ...subscribersArray as NonNullable<PubSubEventSubscriber<T>[]>,
    ]
    eventsSubscribers[event] = removeSubscriber
      .filter(s => s.key !== key) as PubSubEventSubscribers[T]
  }
}

/**
 * clear all events and subscribers
 */
const clear = (): void => {
  (Object.keys(eventsSubscribers) as PubSubEvent[])
    .forEach(e => { eventsSubscribers[e] = [] })
}

const eventEmitter = new EventEmitter()

eventEmitter.on('publish', async (
  event: PubSubEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): Promise<void> => {
  // window.setImmediate(async () => {
  try {
    const subscribers = getEventSubscribers(event)
    await Promise.all(subscribers.map(s => s.callback(data)))
  } catch (e: unknown) {
    //
  }
})
// })

/**
 * Trigger an event
 */
const publish = async <T extends PubSubEvent>(
  event: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
): Promise<boolean> => eventEmitter.emit('publish', event, data)

export default {
  subscribe,
  unsubscribe,
  publish,
  getEventSubscribers,
  clear,
}
