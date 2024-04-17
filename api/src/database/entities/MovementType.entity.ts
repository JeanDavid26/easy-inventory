import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'easyinventory', name: 'movementtype' })
export class MovementType {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label : string
}