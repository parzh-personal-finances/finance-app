import { Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Entity } from '@/entities/entity.entity.js'
import { PrimaryColumnUUID } from '@/db/primary-column-uuid.decorator.js'
import { Table } from '@/db/table.decorator.js'
import { ColumnMoney } from '@/db/column-money.decorator.js'
import { BalanceEvent } from '@/entities/balance-event.entity.js'

@Table({
  name: 'transaction',
})
export class Transaction {
  @PrimaryColumnUUID('transaction_id')
  readonly id!: string

  @Column({
    name: 'transaction_timestamp',
    type: 'bigint',
    update: false,
  })
  readonly timestamp!: number

  @ColumnMoney('transaction_amount')
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

  @ManyToOne(() => Transaction, {
    eager: false,
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'transaction_refunded_transaction_id',
  })
  readonly refundedTransaction?: Transaction | null

  @Column({
    name: 'transaction_description',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  description?: string | null

  // ***

  @OneToMany(() => BalanceEvent, (event) => event.transaction, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  readonly balanceEvents!: BalanceEvent[]
}
