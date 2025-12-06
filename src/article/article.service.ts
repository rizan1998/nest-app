import { Injectable } from '@nestjs/common';
import { IArticle } from './interface/article.interface';
import { createArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(Article)
        private ArticleRepository: Repository<Article>,
    ) {

    }

    async createArticle(createArticleDto: createArticleDto): Promise<Article> {

        const newArticle = await this.ArticleRepository.save(createArticleDto);
        return newArticle;

    }

    async findAllArticle(): Promise<Article[]> {
        return await this.ArticleRepository.find();
    }

    async findOneBydParams(id: string): Promise<Article | null> {
        const article = await this.ArticleRepository.findOneBy({ id });
        return article;
    }

    async updateArticleByParams(article: Article, updateArticleDto: updateArticleDto): Promise<Article> {
        Object.assign(article, updateArticleDto);
        return await this.ArticleRepository.save(article);
    }

    async deleteArticleByParams(articleData: Article): Promise<void> {
        await this.ArticleRepository.delete
            (articleData.id);

    }
}
