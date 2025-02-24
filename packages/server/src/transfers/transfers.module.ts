import { Module } from "@nestjs/common";
import { ConfigModule } from "@/config/config.module.js";
import { DbModule } from "@/db/db.module.js";
import { Transfer } from "./transfer.entity.js";
import { TransfersService } from "./transfers.service.js";
import { TransfersController } from './transfers.controller.js';

/** @private */
const typeOrmEntities = DbModule.forFeature([
  Transfer,
])

@Module({
  imports: [
    typeOrmEntities,
    ConfigModule,
  ],
  providers: [
    TransfersService,
  ],
  controllers: [
    TransfersController,
  ],
  exports: [
    typeOrmEntities,
    TransfersService,
  ],
})
export class TransfersModule { }
