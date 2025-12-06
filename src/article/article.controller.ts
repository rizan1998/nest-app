import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';
import type { IArticle } from './interface/article.interface';
import { FindOneParams } from './dto/find-one.params';
import { Article } from './entities/article.entity';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {

    }

    @Get()
    async findAll(): Promise<Article[]> {
        return this.articleService.findAllArticle();
    }

    @Get("/:id")
    async findOne(@Param("id") params: any): Promise<Article | null> {
        return await this.findOneOrFail(params);
    }

    @Post()
    async create(@Body() createArticleDto: createArticleDto): Promise<Article> {
        return await this.articleService.createArticle(createArticleDto);
    }

    @Put("/:id")
    async update(@Param() params: FindOneParams, @Body() updateArticleDto: updateArticleDto): Promise<Article> {
        const article = await this.findOneOrFail(params.id); // await the promise
        return this.articleService.updateArticleByParams(article, updateArticleDto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param() params: FindOneParams): Promise<void> {
        const article = await this.findOneOrFail(params.id); // await the promise
        return this.articleService.deleteArticleByParams(article);
    }


    private async findOneOrFail(id: string): Promise<Article> {
        const article = await this.articleService.findOneBydParams(id);
        if (!article) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }
        return article;
    }

}
