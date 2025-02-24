import { Controller, Get, NotImplementedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard.js';

@UseGuards(AuthGuard)
@Controller('transfers')
export class TransfersController {
  @Get()
  async getTransfers() {
    throw new NotImplementedException()
  }
}
