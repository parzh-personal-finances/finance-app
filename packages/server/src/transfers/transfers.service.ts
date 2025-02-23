import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetLatestTransfersQuery } from "./get-latest-transfers-query.dto.js";
import { Transfer } from "./transfer.entity.js";

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    protected readonly transfersRepository: Repository<Transfer>,
  ) { }

  async getLatestTransfers({
    limit,
  }: GetLatestTransfersQuery): Promise<Transfer[]> {
    const transfers = await this.transfersRepository.find({
      order: {
        timestamp: 'desc',
      },
      take: limit,
    })

    return transfers
  }
}
