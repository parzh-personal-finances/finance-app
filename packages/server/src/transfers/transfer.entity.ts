import { Column, Entity as TypeOrmEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Entity } from '@/entities/entity.entity.js'
import { PrimaryColumnUUID } from '@/db/primary-column-uuid.decorator.js'
import { ColumnMoney } from '@/db/column-money.decorator.js'
import { BalanceEvent } from '@/entities/balance-event.entity.js'

@TypeOrmEntity({
  name: 'transfer',
})
export class Transfer {
  @PrimaryColumnUUID('transfer_id')
  readonly id!: string

  @Column({
    name: 'transfer_timestamp',
    type: 'bigint',
    update: false,
  })
  readonly timestamp!: number

  @ColumnMoney('transfer_amount')
  amount!: number

  @ManyToOne(() => Entity, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'entity_debit_id',
  })
  readonly entityDebit!: Entity

  @ManyToOne(() => Entity, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'entity_credit_id',
  })
  readonly entityCredit!: Entity

  @ManyToOne(() => Transfer, {
    eager: false,
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'transfer_refunded_transfer_id',
  })
  readonly refundedTransfer?: Transfer | null

  @Column({
    name: 'transfer_description',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  description?: string | null

  // ***

  @OneToMany(() => BalanceEvent, (event) => event.transfer, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  readonly balanceEvents!: BalanceEvent[]
}
