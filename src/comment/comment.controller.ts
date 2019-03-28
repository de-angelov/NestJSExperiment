import { Controller, Get, Param, UseGuards, UsePipes } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('api/comment')
export class CommentController {
  constructor(private commentService: CommentService){

  }

  @Get('idea/:id')
  showCommentsByIdea(@Param('id') idea: string){

  }

  @Get('user/:id')
  showCommentsByUser(@Param('id') user: string){
  }
  
  @Post('idea/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createComment(@Param('id') idea:string ){

  
  }

}
