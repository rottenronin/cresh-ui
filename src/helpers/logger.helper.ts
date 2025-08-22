import type { LogLevel, Logger } from '../@types/cresh-ui'

export const levels: LogLevel[] = [
  'debug',
  'info',
  'warn',
  'error',
]

export const logger = (minLevel: LogLevel = 'warn') => (context: string): Logger => {
  const allowedLevels = levels.slice(levels.indexOf(minLevel))
  const log = (level: LogLevel, prefix: string) => (
    (...messages: string[]): void => {
      if (allowedLevels.includes(level)) {
        // eslint-disable-next-line no-console
        console[level](
          `%c[${level.toUpperCase()}] ${prefix}`,
          'color: #400ec9; font-weight: bold',
          ...messages,
        )
      }
    }
  )

  // TODO: find how to bundle with corejs 3.x proposals
  // return levels.reduce<LogLevels>((logs, level) => {
  //   const extend = `${moduleName}:${context} [${level.toUpperCase()}]`
  //   return { ...logs, [level]: log(level, extend) }
  // }, {} as LogLevels)

  return {
    debug: log('debug', `admin:${context}`),
    info: log('info', `admin:${context}`),
    warn: log('warn', `admin:${context}`),
    error: log('error', `admin:${context}`),
  }
}

/** Singleton is kept hidden within the Module */
let loggerSingleton: (context: string) => Logger

/**
 * Retrieves the only instance of the Singleton
 */
const useLogger = () => {
  if (!loggerSingleton) {
    /** Lazy initialisation */
    // console.log('import.meta.env.PROD', import)
    loggerSingleton = logger(import.meta.env.PROD ? 'warn' : 'debug')
  }
  return loggerSingleton
}

export default useLogger
