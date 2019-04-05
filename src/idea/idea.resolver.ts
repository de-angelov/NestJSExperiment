import { Resolver, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { Query } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { CommentService } from 'src/comment/comment.service';

@Resolver()
export class IdeaResolver {
  constructor(
    private ideaService: IdeaService,
    private commentService: CommentService,
  ) {}

  @Query()
  ideas(@Args('page') page: number, @Args('newest') newest: boolean) {
    this.ideaService.showAll(page, newest);
  }

  @ResolveProperty()
  comments(@Parent() idea) {
    const { id } = idea;
    return this.commentService.showByIdea(id);
  }
}
