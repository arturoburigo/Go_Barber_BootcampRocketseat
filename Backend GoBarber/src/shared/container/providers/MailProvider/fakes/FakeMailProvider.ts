import IMailProvider from '../models/IMailProvider'

interface IMessage {
  to: string
  body: string
}

export default class FakeMailProvider implements IMailProvider {
  private massages: IMessage[] = []

  public async sendMail(to: string, body: string): Promise<void> {
    this.massages.push({
      to,
      body,
    })
  }
}
