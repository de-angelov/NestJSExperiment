import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { UserDTO } from './user.dto';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService,
    private commentService: CommentService,
  ) {}

  @Query()
  users(@Args('page') page: number) {
    return this.userService.showAll(page);
  }

  @Mutation()
  login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: UserDTO = { username, password };
    return this.userService.login(user);
  }

  @Mutation()
  register(@Args()
  {
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user: UserDTO = { username, password };
    return this.userService.register(user);
  }

  @ResolveProperty()
  comments(@Parent() user) {
    const { id } = user;
    return this.commentService.showByUser(id);
  }
}
