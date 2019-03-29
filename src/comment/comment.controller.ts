import { Controller, Get, Param, UseGuards, UsePipes, Post, ValidationPipe, Body, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { CommentDto } from './comment.dto';
import { User } from 'src/shared/user.decorator';

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
  createComment(@Param('id') idea:string, @User('id') user: string, @Body() data: CommentDto ){
    return this.commentService.create(idea, user, data);
  }

  @Get(':id')
  showComment(@Param('id') id: string){
      return this.commentService.show(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destoyComment(@Param('id') id: string, @User('id') user: string){

  }


}
