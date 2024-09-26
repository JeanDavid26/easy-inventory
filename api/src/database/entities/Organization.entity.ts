import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { User } from './User.entity'

@Entity({ schema: 'easyinventory', name: 'organization' })
export class Organization extends BaseTable {

  @Column()
  label : string

  @Column({ name : 'useridowner', nullable : true })
  userIdOwner : number

  @OneToOne(_type => User, user => user.id)
  @JoinColumn({ name: 'useridowner' })
  oUserOwner: User

  @OneToMany(() => User, user => user.oOrganization)
  tUser: User[]
}