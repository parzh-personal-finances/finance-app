import { Module } from "@nestjs/common";
import { DbModule } from "@/db/db.module.js";
import { Transfer } from "./transfer.entity.js";
import { TransfersService } from "./transfers.service.js";

/** @private */
const typeOrmEntities = DbModule.forFeature([
  Transfer,
])

@Module({
  imports: [
    typeOrmEntities,
  ],
  providers: [
    TransfersService,
  ],
  exports: [
    typeOrmEntities,
    TransfersService,
  ],
})
export class TransfersModule { }
