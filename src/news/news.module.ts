/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
