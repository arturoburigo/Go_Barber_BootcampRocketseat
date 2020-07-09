import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/user'

import { Exclude } from 'class-transformer'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}
export default Appointment
