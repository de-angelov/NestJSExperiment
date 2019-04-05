import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { IdeaEntity } from './idea.entity';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserEntity } from 'src/user/user.entity';
import { IdeaResolver } from './idea.resolver';
import { CommentEntity } from 'src/comment/comment.entity';
import { CommentService } from 'src/comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity, CommentEntity])],
  controllers: [IdeaController],
  providers: [
    IdeaService,
    CommentService,
    IdeaResolver,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class IdeaModule {}
