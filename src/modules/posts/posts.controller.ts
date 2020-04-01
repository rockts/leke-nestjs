import {
  Controller,
  Get,
  Req,
  Query,
  Headers,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ForbiddenException,
  UseFilters,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePostDto } from './posts.dto';
import { DemoService } from './provideres/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';

@Controller('posts')
// @UseFilters(DemoFilter)
export class PostsController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
    console.log('id:', typeof id);

    return {
      title: `Post ${id}`,
    };
  }

  @Post()
  // @UseFilters(DemoFilter)
  @UsePipes(ValidationPipe)
  store(@Body() post: CreatePostDto) {
    // throw new HttpException('没有权限!', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('没有权限！');
    this.demoService.create(post);
  }
}
