import { Module } from "@nestjs/common";
import { Transaction } from "./transaction.entity.js";
import { TransactionsService } from "./transactions.service.js";
import { DbModule } from "@/db/db.module.js";

/** @private */
const typeOrmEntities = DbModule.forFeature([
  Transaction,
])

@Module({
  imports: [
    typeOrmEntities,
  ],
  providers: [
    TransactionsService,
  ],
  exports: [
    typeOrmEntities,
    TransactionsService,
  ],
})
export class TransactionsModule { }
