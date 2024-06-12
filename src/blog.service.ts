import { Injectable } from '@nestjs/common';
import { PostDto } from 'src/blog.model';
import { BlogFileRepository } from 'src/blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogFileRepository) {}

  async getAllPosts(): Promise<PostDto[]> {
    return await this.blogRepository.getAllPost();
  }

  async createPost(postDto: PostDto) {
    await this.blogRepository.createPost(postDto);
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.blogRepository.getPost(id);
  }

  async delete(id: string) {
    await this.blogRepository.deletePost(id);
  }

  async updatePost(id: string, postDto: PostDto) {
    await this.blogRepository.updatePost(id, postDto);
  }
}
