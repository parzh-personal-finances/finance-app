import { Module } from "@nestjs/common";
import { BalanceEvent } from "./balance-event.entity.js";
import { EntitiesService } from "./entities.service.js";
import { Entity } from "./entity.entity.js";
import { DbModule } from "@/db/db.module.js";

/** @private */
const typeOrmEntities = DbModule.forFeature([
  Entity,
  BalanceEvent,
])

@Module({
  imports: [
    typeOrmEntities,
  ],
  providers: [
    EntitiesService,
  ],
  exports: [
    typeOrmEntities,
    EntitiesService,
  ],
})
export class EntitiesModule { }
