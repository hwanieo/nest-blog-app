import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from 'src/blog.controller';
import { BlogFileRepository, BlogMongoRepository } from 'src/blog.repository';
import { Blog, BlogSchema } from 'src/blog.schema';
import { BlogService } from 'src/blog.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hwniieo:mgHorang98@cluster0.1b5mews.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
