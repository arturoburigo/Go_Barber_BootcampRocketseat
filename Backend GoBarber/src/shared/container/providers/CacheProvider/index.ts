import { container } from 'tsyringe'

import ICashProvider from './models/ICacheProvider'
import RedisCacheProvider from './implementations/RedisCacheProvider'

const providers = {
  redis: RedisCacheProvider,
}

container.registerSingleton<ICashProvider>('CacheProvider', providers.redis)
