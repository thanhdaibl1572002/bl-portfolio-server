import { Mongoose, connect, disconnect } from 'mongoose'
import Logger, { getCallerName } from '@/utils/Logger'
import { config } from 'dotenv'
config()

class MongoDB {
  private connection!: Mongoose
  private logger: Logger

  constructor() {
    this.logger = new Logger(getCallerName(module))
    this.connect()
  }

  private async connect(): Promise<void> {
    try {
      const uri = process.env.MONGO_URI
      if (!uri) {
        throw new Error('Không tìm thấy URI kết nối MongoDB.')
      }
      this.connection = await connect(uri)
      this.logger.info('Kết nối MongoDB thành công.')
    } catch (error) {
      this.logger.error('Lỗi kết nối MongoDB.')
      console.error(error)
      process.exit(1)
    }
  }

  public getConnection(): Mongoose {
    return this.connection
  }

  public async disconnect(): Promise<void> {
    await disconnect()
    this.logger.info('Ngắt kết nối MongoDB.')
  }
}

export default MongoDB
