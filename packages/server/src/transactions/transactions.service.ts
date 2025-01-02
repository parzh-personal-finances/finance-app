import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetLatestTransactionsQuery } from "./get-latest-transactions-query.dto.js";
import { Transaction } from "./transaction.entity.js";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    protected readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async getLatestTransactions({
    limit,
  }: GetLatestTransactionsQuery): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.find({
      order: {
        timestamp: 'desc',
      },
      take: limit,
    })

    return transactions
  }
}
