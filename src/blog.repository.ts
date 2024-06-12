import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { readFile, writeFile } from 'fs/promises';
import { Model } from 'mongoose';
import { PostDto } from 'src/blog.model';
import { Blog, BlogDocument } from 'src/blog.schema';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  getPost(id: string): Promise<PostDto>;
  createPost(postDto: PostDto);
  updatePost(id: string, postDto: PostDto);
  deletePost(id: string);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
  FILE_NAME = './src/blog.data.json';

  async getAllPost(): Promise<PostDto[]> {
    const datas = await readFile(this.FILE_NAME, 'utf8');
    const posts = JSON.parse(datas);
    return posts;
  }

  async createPost(postDto: PostDto) {
    const posts = await this.getAllPost();
    const id = posts.length + 1;
    const createPost = { id: id.toString(), ...postDto, createdDt: new Date() };
    posts.push(createPost);
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }

  async getPost(id: string): Promise<PostDto> {
    const posts = await this.getAllPost();
    const post = posts.find((post) => post.id === id);
    return post;
  }

  async deletePost(id: string) {
    const posts = this.getAllPost();
    const filteredPost = (await posts).filter((post) => post.id !== id);
    await writeFile(this.FILE_NAME, JSON.stringify(filteredPost));
  }

  async updatePost(id: string, postDto: PostDto) {
    const posts = await this.getAllPost();
    const index = posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updatedDt: new Date() };
    posts[index] = updatePost;
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async getAllPost(): Promise<PostDto[]> {
    return await this.blogModel.find().exec();
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.blogModel.findById(id);
  }

  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };

    await this.blogModel.create(createPost);
  }

  async updatePost(id: string, postDto: PostDto) {
    const updatePost = {
      id,
      ...postDto,
      updatedDt: new Date(),
    };

    await this.blogModel.findByIdAndUpdate(id, updatePost);
  }

  async deletePost(id: string) {
    await this.blogModel.findByIdAndDelete(id);
  }
}
