import { createLogger, format, transports, LoggerOptions, Logger as WinstonLogger } from 'winston'
import path from 'path'

export const getCallerName = (module: NodeModule) => {
  return path.basename(module.path) + '/' + path.basename(module.filename)
}

enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly'
}

class Logger {
  private logger: WinstonLogger
  private caller: string
  private label?: string
  private filename?: string

  constructor(
    caller: string,
    label: string = 'server',
    filename: string = 'server.log',
  ) {
    this.caller = caller
    this.label = label
    this.filename = filename

    const colorizer = format.colorize()
    colorizer.addColors({
      error: 'bold red', 
      warn: 'bold yellow', 
      info: 'bold blue', 
      http: 'bold green', 
      verbose: 'bold magenta', 
      debug: 'bold grey', 
      silly: 'bold cyan' 
    })

    const options: LoggerOptions = {
      format: format.combine(
        format.timestamp(),
        format.simple(),
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.errors({ stack: true }),
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.printf(
              log => colorizer.colorize(
                log.level,
                `[${this.label?.toUpperCase()} - ${this.caller}] ${log.timestamp} ${log.level?.toUpperCase()}: ${log.message}${log.data ? `\n${JSON.stringify(log.data, null, 2)}` : ''}`
              )
            )
          ),
        }),
        new transports.File({ 
          filename: this.filename,
          dirname: './loggers',
          format: format.combine(
            format.printf(
              log => `[${this.label?.toUpperCase()} - ${this.caller}] ${log.timestamp} ${log.level?.toUpperCase()}: ${log.message}${log.data ? `\n${JSON.stringify(log.data, null, 2)}` : ''}`
            )
          )
        }),
      ],
    }

    this.logger = createLogger(options)
  }

  info<T>(message: string, data?: T) {
    this.logger[LogLevel.INFO](message, { data })
  }

  warn<T>(message: string, data?: T) {
    this.logger[LogLevel.WARN](message, { data })
  }

  error<T>(message: string, data?: T) {
    this.logger[LogLevel.ERROR](message, { data })
  }

  debug<T>(message: string, data?: T) {
    this.logger[LogLevel.DEBUG](message, { data })
  }

  http<T>(message: string, data?: T) {
    this.logger[LogLevel.HTTP](message, { data })
  }

  silly<T>(message: string, data?: T) {
    this.logger[LogLevel.SILLY](message, { data })
  }

  verbose<T>(message: string, data?: T) {
    this.logger[LogLevel.VERBOSE](message, { data })
  }
}

export default Logger