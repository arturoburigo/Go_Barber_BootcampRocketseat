import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import Users from '@modules/users/infra/typeorm/entities/user'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider_id: string

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'provider_id' })
  provider: string

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}
export default Appointment
