import { Module } from '@nestjs/common';
import { BlogController } from 'src/blog.controller';
import { BlogFileRepository } from 'src/blog.repository';
import { BlogService } from 'src/blog.service';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository],
})
export class AppModule {}
