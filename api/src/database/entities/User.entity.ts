import { BaseTable } from './BaseTable'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Organization } from './Organization.entity'
@Entity({ schema: 'easyinventory', name: 'user' })
export class User extends BaseTable {
  
  @Column({ name: 'email' })
  email: string

  @Column({ name: 'firstname' })
  firstName: string

  @Column({ name: 'lastname' })
  lastName: string

  @Column({ name: 'password' })
  password: string
  
  @Column({ name: 'organizationid', nullable: true })
  organizationId: number

  @ManyToOne(() => Organization, (organization) => organization.id)
  @JoinColumn({ name: 'organizationid' })
  oOrganization: Organization
}
