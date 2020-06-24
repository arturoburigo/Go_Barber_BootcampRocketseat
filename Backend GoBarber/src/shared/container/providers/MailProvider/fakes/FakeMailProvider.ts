import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

export default class FakeMailProvider implements IMailProvider {
  private massages: ISendMailDTO[] = []

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.massages.push(message)
  }
}
