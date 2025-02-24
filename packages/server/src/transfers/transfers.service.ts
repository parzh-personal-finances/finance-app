import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transfer } from "./transfer.entity.js";

// TODO: see https://chatgpt.com/share/67bbb774-5760-8009-9807-f45622a94194

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    protected readonly transfersRepository: Repository<Transfer>,
  ) { }
}
