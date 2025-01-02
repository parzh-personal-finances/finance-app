import { PrimaryGeneratedColumn } from "typeorm";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions.js";

/** @private */
type Params = Omit<PrimaryGeneratedColumnUUIDOptions, 'name' | 'comment'>

export function PrimaryColumnUUID(columnName: string, params?: Params): PropertyDecorator {
  return PrimaryGeneratedColumn('uuid', {
    name: columnName,
    ...params,
  })
}
