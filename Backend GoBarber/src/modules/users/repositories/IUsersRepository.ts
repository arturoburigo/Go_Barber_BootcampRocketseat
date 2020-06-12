import User from '../infra/typeorm/entities/user'
import ICreateUserDTO from '../dtos/ICreateUsersDTO'

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
