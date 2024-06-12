import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostDto } from 'src/blog.model';
import { BlogService } from 'src/blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAllPosts(): Promise<PostDto[]> {
    console.log('모든 게시글 가져오기');
    return await this.blogService.getAllPosts();
  }

  @Post()
  async createPost(@Body() postDto: PostDto) {
    console.log('게시글 작성');
    await this.blogService.createPost(postDto);
    return 'Success';
  }

  @Get('/:id')
  async getPost(@Param('id') id: string): Promise<PostDto> {
    console.log(`[id: ${id}] 게시글 하나 가져오기`);
    return await this.blogService.getPost(id);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    console.log('게시글 삭제');
    await this.blogService.delete(id);
    return 'Success';
  }

  @Put('/:id')
  async updatePost(@Param('id') id: string, @Body() postDto: PostDto) {
    console.log(`[${id}] 게시글 업데이트`, id, postDto);
    await this.blogService.updatePost(id, postDto);
    return 'Success';
  }
}
