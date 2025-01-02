import { Column, Entity as TypeOrmEntity, JoinColumn, ManyToOne } from 'typeorm';
import { ColumnMoney } from '@/db/column-money.decorator.js';
import { Transaction } from '@/transactions/transaction.entity.js';
import { Entity } from '@/entities/entity.entity.js';

@TypeOrmEntity('balance_event')
export class BalanceEvent {
  @Column({
    name: 'transaction_id',
    type: 'uuid',
    primary: true,
    update: false,
  })
  readonly transactionId!: string

  @Column({
    name: 'entity_id',
    type: 'uuid',
    primary: true,
    update: false,
  })
  readonly entityId!: string

  @ColumnMoney('entity_balance')
  entityBalance!: number;

  // ***

  @ManyToOne(() => Transaction, (transaction) => transaction.balanceEvents, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'transaction_id',
  })
  readonly transaction!: Transaction;

  @ManyToOne(() => Entity, (entity) => entity.balanceEvents, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'entity_id',
  })
  readonly entity!: Entity;
}
