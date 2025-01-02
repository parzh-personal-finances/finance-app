import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Entity } from "./entity.entity.js";

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entity)
    protected readonly entitiesRepository: Repository<Entity>,
  ) {}

  async getAllEntities(): Promise<Entity[]> {
    const entities = await this.entitiesRepository.find()

    return entities
  }

  async getEntityWithBalanceEvents(entityId: string): Promise<Entity | null> {
    const result = await this.entitiesRepository.findOne({
      where: {
        id: entityId,
      },
      relations: {
        balanceEvents: true,
      },
    })

    return result
  }
}
