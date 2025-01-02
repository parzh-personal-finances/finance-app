import { Column, Entity as TypeOrmEntity, OneToMany } from 'typeorm'
import { PrimaryColumnUUID } from '@/db/primary-column-uuid.decorator.js'
import { BalanceEvent } from './balance-event.entity.js'

/** @private */
const entityTypes = [
  'account',
  'category_expense',
  'category_income',
  'person',
] as const

export type EntityType = (typeof entityTypes)[number]

@TypeOrmEntity({
  name: 'entity',
})
export class Entity {
  @PrimaryColumnUUID('entity_id')
  readonly id!: string

  @Column({
    name: 'entity_type',
    type: 'enum',
    enum: entityTypes,
    enumName: 'entity_type',
    update: false,
  })
  readonly type!: EntityType

  @Column({
    name: 'entity_name',
    type: 'varchar',
    length: 255,
  })
  name!: string

  // ***

  @OneToMany(() => BalanceEvent, (event) => event.entity, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  readonly balanceEvents?: BalanceEvent[]
}
