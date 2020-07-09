import { container } from 'tsyringe'
import EtherealMailProvider from './implementations/EtherealMailProvider'
import IMailProvider from './models/IMailProvider'

const providers = {
  ethreal: container.resolve(EtherealMailProvider),
}

container.registerInstance<IMailProvider>('MailProvider', providers.ethreal)
