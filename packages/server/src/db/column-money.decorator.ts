import { Column, type ColumnOptions } from "typeorm";

/** @private */
type Params = Omit<ColumnOptions, 'name'>

export function ColumnMoney(columnName: string, params?: Params): PropertyDecorator {
  return Column({
    name: columnName,
    type: 'decimal',
    precision: 10,
    scale: 2,
    ...params,
  })
}
