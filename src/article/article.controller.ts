import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';
import type { IArticle } from './interface/article.interface';
import { FindOneParams } from './dto/find-one.params';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {
        
    }

    @Get()
    findAll(): IArticle[] {
        return this.articleService.findAllArticle();
    }

    @Get("/:id")
    findOne(@Param("id") params: any): IArticle{
        return this.findOneOrFail(params);
    }
    
    @Post()
    create(@Body() createArticleDto: createArticleDto) {
        return this.articleService.createArticle(createArticleDto);
    }

    @Put("/:id")
    update(@Param() params:FindOneParams, @Body() updateArticleDto: updateArticleDto): IArticle{
        const article = this.findOneOrFail(params.id);
        return this.articleService.updateArticleByParams(article, updateArticleDto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param() params: FindOneParams): void{
        const article = this.findOneOrFail(params.id);
        this.articleService.deleteArticleByParams(article);
    }

    private findOneOrFail(id: string): IArticle { 
        const article = this.articleService.findOneBydParams(id);
        if (!article) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }
        return article;
    }

}
