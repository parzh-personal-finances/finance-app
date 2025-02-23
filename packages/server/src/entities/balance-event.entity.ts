import { Column, Entity as TypeOrmEntity, JoinColumn, ManyToOne } from 'typeorm';
import { ColumnMoney } from '@/db/column-money.decorator.js';
import { Transfer } from '@/transfers/transfer.entity.js';
import { Entity } from '@/entities/entity.entity.js';

@TypeOrmEntity('balance_event')
export class BalanceEvent {
  @Column({
    name: 'transfer_id',
    type: 'uuid',
    primary: true,
    update: false,
  })
  readonly transferId!: string

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

  @ManyToOne(() => Transfer, (transfer) => transfer.balanceEvents, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'transfer_id',
  })
  readonly transfer!: Transfer;

  @ManyToOne(() => Entity, (entity) => entity.balanceEvents, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'entity_id',
  })
  readonly entity!: Entity;
}
