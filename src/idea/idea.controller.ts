import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/shared/user.decorator';

@Controller('api/ideas')
export class IdeaController {
  private logger = new Logger('IdeaController');

  constructor(private ideaService: IdeaService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
    options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
  }

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  // @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  @UsePipes(ValidationPipe)
  createIdea(@User('id') user, @Body() data: IdeaDTO) {
    this.logData({ user, data });
    return this.ideaService.create(user, data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }
  @Put(':id')
  // @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard());
  @UsePipes(ValidationPipe)
  updateIdea(@Param('id') id: string, @User('id') user: string,  data: Partial<IdeaDTO>) {
    this.logData({ id, user, data})
    this.logger.log(JSON.stringify(data));
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyIdea(@Param('id') id: string, @user('id') user) {
    this.logData({Id, user});
    return this.ideaService.destroy(id, user);
  }
}
