import { Module } from '@nestjs/common'
import { ConfigModule } from '@/config/config.module.js'
import { dataSourceOptionsProvider } from './data-source-options.provider.js'

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    dataSourceOptionsProvider,
  ],
  exports: [
    dataSourceOptionsProvider,
  ],
})
export class DataSourceModule {}
