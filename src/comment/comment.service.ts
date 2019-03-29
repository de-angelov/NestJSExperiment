import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { IdeaEntity } from 'src/idea/idea.entity';
import { UserEntity } from 'src/user/user.entity';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>, 
    @InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity> 
  ){}

  async showByIdea(id: string){
    const idea = await this.ideaRepository.findOne({
      where: {id},
      relations: ['comments', 'comments.autor', 'comments.idea'];
    });

    return idea.comments;

  }

  async showByUser(id: string){
    const comments = await this.commentRepository.find({
      where: { author: {id }},
      relations: ['Author'],
    });


    return comments;
  }

  async show(id: string){
    const comment = await this.commentRepository.findOne({ where: {id}, relations: ['autor', 'idea']});
    return comment;
  }

  async create(ideaId: string, userId: string, data: CommentDto){
    const idea = await this.ideaRepository.findOne({where: {id: ideaId} });
    const user = await this.userRepository.findOne({where: {id: userId} });

    const comment = await this.commentRepository.create({
      ...data,
      idea,
      author: user
    });

    await this.commentRepository.save(comment);
    return comment;
  }

  async destroy(id: string, userId: string){
    const comment = await this.commentRepository.findOne({
      where: {id},
      relations: ['author', 'idea'],
    });

    if(comment.author.id !== userId){
      throw new HttpException('You do not own this comment',HttpStatus.UNAUTHORIZED);
    }

    await this.commentRepository.remove(comment);
    return comment;
  }
}
