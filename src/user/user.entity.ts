import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.ro';
import { IdeaEntity } from 'src/idea/idea.entity';
import { threadId } from 'worker_threads';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @OneToMany(type => IdeaEntity, idea => idea.author)
  ideas: IdeaEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @ManyToMany({type => IdeaEntity,{cascade: true})
  @JoinTable()
  bookmarks: IdeaEntity[];


  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, username, token } = this;
    const responseObject: UserRO = { id, created, username };
    if (showToken) {
      responseObject.token = token;
    }

    if(this.bookmarks){
      responseObject.bookmarks = this.bookmarks;
    }

    if(this.ideas){
      responseObject.ideas = this.ideas;
    }
    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      // 'process.env.SECRET',
      { expiresIn: '7d' },
    );
  }
}
